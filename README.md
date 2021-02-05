# e-commerce-store
Create a sample ecommerce site using the Fake Store API. The fake store will have basic functionality.

## Development server
Use `npm install` to install the application
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Principles applied
* Framework used to develop the web app is Angular
* Ngrx store was used to store cart, product and user details so that the data is shared seamlessly across components
* Filter input can be used multi-select categories. If no categories are selected, no filter is applied.
* Search bar filter could be used to filter it using title, description, category and price
* Sort could be applied to each field supporting both ascending and descending order.
* The application is deployed in an ec2 instance in the following url http://ec2-13-211-19-146.ap-southeast-2.compute.amazonaws.com/
* Testing is used to test each components for checking form validations, filtering and sorting logic.
* Used Grid to support cross display support from mobile to large screen.
