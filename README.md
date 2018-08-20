# ioi-calculators
App for calculating performance of several IO Industries products (framerate, storage, etc.).

### Dependencies
Before building (for development or production), the following actions must be performed:
1. Install the current version of [Node.js](https://nodejs.org/en/).
2. Open a terminal and install Yarn by running `npm install -g yarn`.
3. Navigate to the project directory.
2. Run `yarn install` to download/install the required project dependencies.

### Development
1. Run `yarn dev` to start the development server.
2. View the application at `http://localhost:8080/calculator/`.

The development server watches for changes in the `/src/` directory and automatically updates the application. No need to restart the application after saving changes.

### Production
To build a minified, production-ready version of the application:
1. Run `yarn build`. The application will be compiled to `/public/calculator/`.
2. Run `yarn start` to start the production server.
3. View the application at `http://localhost:3000/calculator/`.

To update the application on the official website:
1. Connect to `ioindustries.com` via FTP on port `21`.
2. Drag the contents of `/public/calculator/` in the project to `/calculator/` on the FTP server.
3. View the application at `http://ioindustries.com/calculator/`.

The application operates on "routes". So if the URL changes, the application must be modified and rebuilt to function correctly.
