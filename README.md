# Front-end Project

![https://img.shields.io/badge/React-v.18-blue](React)
![https://img.shields.io/badge/Redux-v.1.9-purple](Redux toolkit)
![https://img.shields.io/badge/TypeScript-v.4.9-green](TypeScript)
![https://img.shields.io/badge/SASS-v.4.9-hotpink](SASS)

## Requirement

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Home page, product page,
profile page (only available if user logins), and cart page (cart could be a page or a modal)
3. Use context API to create a button to switch themes of the web app
4. Create Redux store for following features:
    - product reducer: get all products, find a single products, sort products by
    categories, sort products by price, update and delete a product (enable update & delete features only for admin of the webapp. For example, you can check if user is your admin account before let them delete product)
    - user reducer: get all users, find a single user, create new user (delete user is not allowed in this api), authenticate user
    - cart reducer: add product to cart, remove products, update products's quantity in cart
5. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
