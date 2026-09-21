# Memory Game

A responsive memory-matching game built with Vue, Pinia, and Vue Router. The project provided an opportunity to deepen my experience with Vue application architecture, centralized state management, routing, persistence, and interactive game logic.

**[Live Site](https://elisilk.github.io/memory-game/)** · **[Frontend Mentor Solution](https://www.frontendmentor.io/solutions/memory-game-implemented-with-vue-and-pinia-9hFdn-RHG3)**

![Memory game desktop screenshot](./screenshots/screenshot-desktop-in-game-multiplayer.png)

## Overview

This project is a solution to the [Frontend Mentor Memory Game challenge](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM).

The challenge provides a visual design and interaction specification for a memory game supporting solo and multiplayer play, different grid sizes, and number- or icon-based themes.

I used the project to move beyond primarily interface-focused implementations and explore how a Vue application can be organized around shared state, multiple views, persistent data, and coordinated user interactions.

## Features

- Responsive layouts for mobile, tablet, and desktop
- Solo and multiplayer game modes
- 4×4 and 6×6 game grids
- Number- and icon-based game themes
- Game state managed with Pinia
- Separate setup and gameplay views using Vue Router
- Persistent solo-game statistics using localStorage
- Responsive menu and game configuration controls
- Accessible labeling and native form controls
- Responsive handling of the game viewport and page background

## Built With

- Vue
- Pinia
- Vue Router
- Vite
- JavaScript
- Semantic HTML
- CSS custom properties
- CSS Grid and Flexbox
- localStorage
- GitHub Actions
- npm

## Technical Highlights

### Centralized Game State with Pinia

The project uses Pinia to centralize game state and coordinate game logic across multiple components.

The store manages:

- Board generation and shuffling
- Game configuration
- Tile selection and matching
- Player turns and statistics
- Move counts
- Timer state
- Game completion
- Restarting and starting new games
- Best-statistics comparisons and updates

Centralizing this logic helps separate the rules and state transitions of the game from the components responsible for displaying the interface.

### Game Logic and State Transitions

The matching process coordinates multiple steps, including recording selected tiles, evaluating pairs, updating player statistics, and progressing through the game.

When two selected tiles do not match, the implementation temporarily preserves the move state before resetting the relevant tiles. This creates a short delay during which players can see the evaluated pair.

The project provided practice with coordinating sequential interactions and managing state that changes over the course of a game.

### Routing with Vue Router

Vue Router separates the game's setup and gameplay views.

The application uses distinct routes for configuring a game and playing it, while Pinia provides the shared state needed to coordinate the application.

This was an opportunity to gain practical experience with routing and organizing a Vue application into multiple views rather than treating the entire interface as a single component.

### Persistent Game Statistics

The application stores solo-game statistics in localStorage so that players can retain their best results between sessions.

When a solo game is completed, the application compares the result with the existing best statistics for the relevant game configuration. Improved results are then updated and saved.

This required coordinating persistent data with the current game state and handling different game configurations rather than simply storing a single global score.

### Reusable Components and Utilities

The project separates recurring interface patterns and supporting logic into reusable components and utilities.

Examples include:

- Shared dialog structure for end-game results
- Reusable buttons and statistics displays
- A utility for generating and shuffling tile values
- Dynamic mapping of game values to icon components
- A media-query composable for responsive interface behavior

These patterns helped keep responsibilities separated as the application grew beyond a small collection of individual components.

### Responsive Interface

The game uses CSS Grid and Flexbox to accommodate different board configurations and screen sizes.

The application also responds to viewport changes and adjusts the page background according to the active view. This required considering the relationship between the Vue application, the document, and the browser viewport rather than relying only on the root application container.

## Accessibility and Responsive Design

Accessibility considerations include:

- Native form controls for tile interactions
- Labels associated with interactive tile inputs
- Visible focus styling
- Accessible labeling for interface controls
- Responsive layouts across different screen sizes

The project uses native checkbox inputs for tile selection rather than relying exclusively on click handlers attached to non-interactive elements.

Further improvements could include more advanced keyboard navigation within the game board and additional testing with assistive technologies.

## Development Workflow

The project uses npm for dependency management and Vite for development and production builds.

Deployment to GitHub Pages is automated with GitHub Actions. A push to the `main` branch:

1. Checks out the repository.
2. Sets up Node.js and the npm cache.
3. Installs dependencies with `npm ci`.
4. Builds the production application.
5. Uploads the resulting `dist` directory as a Pages artifact.
6. Deploys the artifact to GitHub Pages.

The workflow can also be triggered manually from the GitHub Actions interface.

The repository includes project-level configuration for ESLint, Prettier, and VS Code. VS Code file nesting is used to keep related files organized in the editor.

## Screenshots

|                     Mobile designed at 375px:                     |                     Tablet designed at 768px:                     | Desktop designed at 1440px:                                        |
| :---------------------------------------------------------------: | :---------------------------------------------------------------: | ------------------------------------------------------------------ |
|        ![](./screenshots/screenshot-mobile-start-game.png)        |        ![](./screenshots/screenshot-tablet-start-game.png)        | ![](./screenshots/screenshot-desktop-start-game.png)               |
| ![](./screenshots/screenshot-mobile-just-started-multiplayer.png) | ![](./screenshots/screenshot-tablet-just-started-multiplayer.png) | ![](./screenshots/screenshot-desktop-just-started-multiplayer.png) |
|   ![](./screenshots/screenshot-mobile-in-game-multiplayer.png)    |   ![](./screenshots/screenshot-tablet-in-game-multiplayer.png)    | ![](./screenshots/screenshot-desktop-in-game-multiplayer.png)      |
|   ![](./screenshots/screenshot-mobile-results-multiplayer.png)    |   ![](./screenshots/screenshot-tablet-results-multiplayer.png)    | ![](./screenshots/screenshot-desktop-results-multiplayer.png)      |

## Continued Development

Potential future improvements include:

- Further refining keyboard navigation within the game board
- Supporting `prefers-reduced-motion` for animations
- Refining tile-flip transitions
- Expanding the available icon set
- Continuing to refine responsive behavior and visual details

These items are not required for the current implementation but represent areas for possible future exploration.

## What I Learned

This project helped me move from primarily interface-focused development toward thinking more explicitly about application architecture and state management.

In particular, I gained experience with:

- Managing shared application state with Pinia
- Structuring a multi-view Vue application
- Using Vue Router
- Coordinating game state and sequential interactions
- Persisting application data with localStorage
- Comparing and updating stored statistics
- Organizing a growing Vue codebase into components, views, stores, and utilities
- Building responsive interfaces with CSS Grid
- Using GitHub Actions to automate production builds and deployment

## Credits

- [Frontend Mentor](https://www.frontendmentor.io/) for the original design and challenge
- [Vue](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vite.dev/)

## Author

**Eli M. Silk**

- [GitHub](https://github.com/elisilk)
- [Frontend Mentor](https://www.frontendmentor.io/profile/elisilk)
