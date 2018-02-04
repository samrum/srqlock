# srqlock
A non-flash based version of the Uniqlo Uniqlock utilizing Giphy gifs instead of dancing videos.

A deployed instance of this project can be found [here](http://rubenmedina.com). The original Uniqlock has been shutdown, but a video of how it looked can be found [here](https://www.youtube.com/watch?v=rAMC1NizEU0).

## Build Instructions
This project uses [yarn](https://yarnpkg.com/en/docs/install) for package management and webpack for project management.

### Local Development
1. Inside of the project root directory, run `yarn install` to download applicaton dependencies
2. Run `yarn run dev` to run the application in development mode. In development mode, the application will be accessible via http://localhost:8080/ and any changes made to javascript, sass, and html files will hot reload browser content.

### Production Build
1. Inside of the project root directory, run `yarn install` to download applicaton dependencies
2. Run `yarn run prod` to build a productionalized version of the application into the `dist` directory.