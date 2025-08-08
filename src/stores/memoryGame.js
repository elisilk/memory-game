import { defineStore } from 'pinia'
import { msToSec, shuffle } from '@/utils/index'
import { generateTileValues } from '@/utils/tiles'

const turnEvalDelay = 2000
const timerUpdateDelay = 1000

export const useMemoryGameStore = defineStore('memoryGame', {
  state: () => ({
    /** @type {'numbers' | 'icons'} */
    theme: 'numbers',
    /** @type number */
    numPlayers: 1,
    /** @type {'4x4' | '6x6'} */
    gridSize: '4x4',
    /** @type {{ id: string, row: number, col: number, value: string, playable: boolean, faceUp: boolean, paired: boolean, highlighted: boolean }[]} */
    gameboard: [],
    /** @type { player: number, tile1: Object, tile2: Object } */
    currentMove: { player: 1, tile1Id: null, tile2Id: null, isPair: null },
    /** @type { player: number, tile1: Object, tile2: Object } */
    previousMove: null,
    /** @type number */
    timeStartedMs: null,
    /** @type number */
    timeLatestMs: null,
    /** @type number */
    timerId: null,
    /** @type number */
    delayId: null,
    /** @type {{ player: number, numMoves: number, numPairs: number }[]} */
    stats: [],
    /** @type {{ player: number, numMoves: number, numPairs: number }[]} */
    soloBests: [],
  }),
  getters: {
    gameboardSize(state) {
      return state.gridSize === '4x4' ? 4 : 6
    },
    gameboardNumRows() {
      return this.gameboardSize
    },
    gameboardNumCols() {
      return this.gameboardSize
    },
    getCurrentPlayer(state) {
      return state.currentMove.player
    },
    getTile(state) {
      return (tileId) => state.gameboard.find((tile) => tile.id === tileId)
    },
    areTilesAPair() {
      return (tile1Id, tile2Id) => this.getTile(tile1Id).value === this.getTile(tile2Id).value
    },
    getTestTile(state) {
      return (tileId) => state.testTileArray.find((tile) => tile.id === tileId)
    },
    getTimeElapsed(state) {
      // returns time value in seconds (using floor function)
      return msToSec(this.timeLatestMs - state.timeStartedMs)
    },
    allPairsFound(state) {
      return state.gameboard.filter((tile) => !tile.paired).length === 0
    },
    numMovesTotal(state) {
      return state.stats.reduce((acc, curr) => acc + curr.numMoves, 0)
    },
    statsSortedByNumPairs(state) {
      return [...state.stats].sort((a, b) => b.numPairs - a.numPairs)
    },
    getSoloBests(state) {
      return state.soloBests.find(
        (best) => best.theme === state.theme && best.gridSize === state.gridSize,
      )
    },
    isNewSoloBest(state) {
      // -1 - no, current state is not a new best
      // 0 - sort of, current stat is tied with existing best
      // 1 - yes, current stat is a new best
      return (statLabel) => {
        // if not one of the tracked stats, then return false
        if (statLabel !== 'timeElapsed' && statLabel !== 'numMoves') return -1

        const existingBests = this.getSoloBests

        // if no current solo bests, then return true
        if (!existingBests || !existingBests[statLabel]) return 1

        const existingBestValue =
          statLabel === 'timeElapsed' ? existingBests.timeElapsed : existingBests.numMoves
        const newValue =
          statLabel === 'timeElapsed' ? state.getTimeElapsed : state.stats[0].numMoves

        if (newValue < existingBestValue) return 1
        else if (newValue === existingBestValue) return 0
        else return -1
      }
    },
  },
  actions: {
    startTimer() {
      // reset the start time
      this.timeStartedMs = Date.now()
      this.timeLatestMs = this.timeStartedMs

      // start a new timer
      this.timerId = setInterval(() => {
        this.timeLatestMs = Date.now()
      }, timerUpdateDelay)
    },
    initializeGame(newGame) {
      newGame
        ? // generate new set of tiles
          this.generateNewTiles()
        : // reset + shuffle existing tiles
          this.resetAndShuffleTiles()

      // reset the current move
      this.currentMove = { player: 1, tile1Id: null, tile2Id: null, isPair: null }

      // reset the previous move
      this.previousMove = null

      // reset the stats
      this.stats = Array.from({ length: this.numPlayers }, () => ({
        player: null,
        numMoves: 0,
        numPairs: 0,
      }))
      this.stats.forEach((item, index) => (item.player = index + 1))

      // reset the timer
      this.timeStartedMs = null
      this.timeLatestMs = null
      this.timerId = null
    },
    resetAndShuffleTiles() {
      this.gameboard.forEach((tile) => {
        tile.playable = true
        tile.faceUp = false
        tile.paired = false
        tile.highlighted = false
      })
      this.gameboard = shuffle(this.gameboard)
    },
    generateNewTiles() {
      const tileValues = generateTileValues(this.gameboardSize, this.theme)
      this.gameboard = []
      let i = 0
      for (let row = 0; row < this.gameboardNumRows; row++) {
        for (let col = 0; col < this.gameboardNumCols; col++) {
          this.gameboard.push({
            id: 'r' + (row + 1) + 'c' + (col + 1),
            row: row + 1,
            col: col + 1,
            value: tileValues[i],
            playable: true,
            faceUp: false,
            paired: false,
            highlighted: false,
          })
          i++
        }
      }
    },
    newGame() {
      this.initializeGame(true)
    },
    restartGame() {
      this.initializeGame(false)
    },
    endGame() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
      this.timeLatestMs = Date.now()
    },
    resetPreviousMoveTile(previousTileId, paired) {
      const previousTile = this.getTile(previousTileId)

      // if tile not found, then do nothing
      if (!previousTile) return

      const previousTileInCurrentMove =
        previousTile.id === this.currentMove.tile1Id || previousTile.id === this.currentMove.tile2Id
      // it tile part of the current move, then do nothing
      if (previousTileInCurrentMove) return

      // otherwise, reset the tile
      if (paired) {
        // is a pair, so just turn off highlight
        previousTile.highlighted = false
      } else {
        // is not a pair, so turn face down and make playable again
        previousTile.faceUp = false
        previousTile.playable = true
      }
    },
    resetPreviousMoveTiles() {
      // if no, previous move, then just return
      if (!this.previousMove) return

      // reset each of the previous move tiles
      this.resetPreviousMoveTile(this.previousMove.tile1Id, this.previousMove.isPair)
      this.resetPreviousMoveTile(this.previousMove.tile2Id, this.previousMove.isPair)
    },
    setMoveTilesPaired(move, paired = true) {
      const tile1 = this.getTile(move.tile1Id)
      const tile2 = this.getTile(move.tile2Id)

      if (tile1) tile1.paired = paired
      if (tile2) tile2.paired = paired
    },
    setMoveTilesHighlighted(move, highlighted = true) {
      const tile1 = this.getTile(move.tile1Id)
      const tile2 = this.getTile(move.tile2Id)

      if (tile1) tile1.highlighted = highlighted
      if (tile2) tile2.highlighted = highlighted
    },
    clearHighlightedTiles() {
      this.gameboard.forEach((tile) => {
        tile.highlighted = false
      })
    },
    lockFaceDownTiles() {
      this.gameboard
        .filter((tile) => !tile.faceUp)
        .forEach((tile) => {
          tile.playable = false
        })
    },
    unlockFaceDownTiles() {
      this.gameboard
        .filter((tile) => !tile.faceUp)
        .forEach((tile) => {
          tile.playable = true
        })
    },
    incrementMoveCount(player) {
      this.stats.find((item) => item.player === player).numMoves++
    },
    incrementPairsCount(player) {
      this.stats.find((item) => item.player === player).numPairs++
    },
    makeMove(tileId) {
      // start the timer after the first move
      if (!this.timeStartedMs) this.startTimer()
      // NOTE: Could choose not to start the timer if it's a multiplayer game, since that stat is not used. For right now, I kept it in, just in case may want to use it later.

      // save and lock the currently selected tile
      const currentTile = this.getTile(tileId)
      currentTile.playable = false
      currentTile.highlighted = true

      // console.dir(this.previousMove)

      // check if it's the move's first or second tile
      if (!this.currentMove.tile1Id) {
        // first tile in the move
        this.currentMove.tile1Id = tileId

        // reset tiles from previous move (if one exists)
        // this.clearHighlightedTiles()
        if (this.previousMove) this.resetPreviousMoveTiles()

        // clear the delay (if one exists)
        if (this.delayId) {
          clearTimeout(this.delayId)
          this.delayId = null
        }

        return
      }

      if (!this.currentMove.tile2Id) {
        // second tile in the move
        this.currentMove.tile2Id = tileId

        // make all other face-down (non-paired) tiles temporarily unplayable
        this.lockFaceDownTiles()

        // add to the move count
        this.incrementMoveCount(this.currentMove.player)

        // evaluate the move
        this.currentMove.isPair = this.areTilesAPair(
          this.currentMove.tile1Id,
          this.currentMove.tile2Id,
        )

        if (this.currentMove.isPair) {
          // a pair was found

          // set move tiles to paired and highlighted
          this.setMoveTilesPaired(this.currentMove)
          // this.setMoveTilesHighlighted(this.currentMove)

          // add to the current player's pairs count
          this.incrementPairsCount(this.currentMove.player)

          // check if game is over, if so, end the game
          if (this.allPairsFound) {
            this.endGame()
            return
          }
        }

        // if a pair was found, then stay on current player
        // else no pair found, so move to next player
        const nextPlayer = this.currentMove.isPair
          ? this.currentMove.player
          : this.currentMove.player === this.numPlayers
            ? 1
            : this.currentMove.player + 1

        // save current move to the previous move
        this.previousMove = { ...this.currentMove }

        // reset tiles from previous move automatically after some wait time (or if new move has started first, then just do it then)
        this.delayId = setTimeout(() => {
          this.resetPreviousMoveTiles()
        }, turnEvalDelay)

        // re-initialize current move
        this.currentMove = { player: nextPlayer, tile1Id: null, tile2Id: null, isPair: null }

        // make all face-down (non-paired) tiles playable again
        this.unlockFaceDownTiles()

        return
      }

      // Both moves have been made
      console.error('illegal move:', 'can only choose 2 tiles at a time')
    },
    updateSoloBest(statLabel, newStatValue) {
      // if not one of the tracked stats, then return without making any updates
      if (!(statLabel === 'timeElapsed' || statLabel === 'numMoves')) return null

      if (!this.getSoloBests) {
        // if no current solo bests for this game config, then add it in
        const newBestObj = {
          theme: this.theme,
          gridSize: this.gridSize,
        }
        newBestObj[statLabel] = newStatValue
        this.soloBests.push(newBestObj)
        // return the old value (in this case, undefined)
        return undefined
      } else {
        const oldSoloBest = this.getSoloBests[statLabel]
        // otherwise, just set a new value
        this.getSoloBests[statLabel] = newStatValue
        // return the old value
        return oldSoloBest
      }
    },
    updateSoloBests() {
      // if game not over, then don't make any updates
      if (!this.allPairsFound) return

      const oldSoloBests = {}

      // if a new best for time elapsed, then update it
      if (this.isNewSoloBest('timeElapsed') === 1)
        oldSoloBests['timeElapsed'] = this.updateSoloBest('timeElapsed', this.getTimeElapsed)

      // if a new best for num moves, then update it
      if (this.isNewSoloBest('numMoves') === 1)
        oldSoloBests['numMoves'] = this.updateSoloBest('numMoves', this.stats[0].numMoves)

      return oldSoloBests
    },
  },
})
