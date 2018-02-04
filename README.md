# srqlock
A non-flash version of the Uniqlo Uniqlock utilizing Giphy gifs instead of dancing videos. A deployed instance of this project can be found [here](http://rubenmedina.com). The original Uniqlock has been shutdown, but a video of how it looked can be found [here](https://www.youtube.com/watch?v=rAMC1NizEU0).

## Build Instructions
This project uses yarn for package management and webpack for project management.

### Local Development
Running the project in development mode starts a local webpack dev server instance which allows hot reloading of javascript and css changes
1. Run the following command in the project root directory: `yarn run dev`
2. Open http://0.0.0.0:8080/
### Production
1. Run the following command in the project root directory: `yarn run prod`
2. Production build of the project is output in the `dist` directory