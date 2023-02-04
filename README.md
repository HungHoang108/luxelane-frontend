# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9-green)
![SASS](https://img.shields.io/badge/SASS-v.4.9-hotpink)

Live demo [https://merry-genie-108.netlify.app/](https://merry-genie-108.netlify.app/)

## Overview

The app use fake API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to get products, category, user data, authentication and authorization.

## Features

1. Get all products, find a single products, sort products by categories, sort products by price
2. Register for a new customer account, login with Email and password
3. Customer account can create new product
4. Admin can create, delete and edit product. Testing account:
   - Email: admin@mail.com
   - Password: admin123
5. Add product to cart, remove products, update products's quantity in cart

## Future features


- Favourite
- Check out route and payment
- User profile route

## Instruction to run the app

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

## Project Structure

```
fs13-frontend-project
├─ .git
├─ .gitignore
├─ .VSCodeCounter
├─ package.json
├─ public
├─ README.md
├─ src
│  ├─ app.style.scss
│  ├─ App.tsx
│  ├─ components
│  │  ├─ button
│  │  │  └─ Button.tsx
│  │  ├─ cart-dropdown
│  │  │  └─ Cart.tsx
│  │  ├─ categories
│  │  │  └─ Categories.tsx
│  │  ├─ dark-mode
│  │  │  └─ DarkMode.tsx
│  │  ├─ footer
│  │  │  └─ Footer.tsx
│  │  ├─ navigation
│  │  │  └─ Navigation.tsx
│  │  ├─ not-found
│  │  │  └─ NotFound.tsx
│  │  ├─ product-card
│  │  │  └─ ProductCard.tsx
│  │  ├─ product-editing-form
│  │  │  └─ ProductEditForm.tsx
│  │  ├─ root
│  │  │  └─ Root.tsx
│  │  └─ subcribe
│  │     └─ Subcribe.tsx
│  ├─ hooks
│  │  └─ reduxHook.ts
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ cart-page
│  │  │  └─ CartPage.tsx
│  │  ├─ category
│  │  │  └─ CategoryRoute.tsx
│  │  ├─ home
│  │  │  └─ Home.tsx
│  │  ├─ login-logout
│  │  │  └─ Login.tsx
│  │  ├─ new-product
│  │  │  └─ NewProduct.tsx
│  │  ├─ product
│  │  │  └─ ProductRoute.tsx
│  │  ├─ product-list
│  │  │  └─ ProductList.tsx
│  │  └─ searchResult
│  │     └─ SearchResult.tsx
│  ├─ react-app-env.d.ts
│  ├─ redux
│  │  ├─ cartItemsReducer.ts
│  │  ├─ categoriesReducer.ts
│  │  ├─ darkModeReducer.ts
│  │  ├─ productReducer.ts
│  │  ├─ searchTagReducer.ts
│  │  ├─ singleProductReducer.ts
│  │  ├─ sortCategoryReducer.ts
│  │  ├─ store.ts
│  │  └─ userReducer.ts
│  ├─ setupTests.ts
│  ├─ styles
│  │  ├─ image
│  │  │  └─ kitty-cat.jpg
│  │  ├─ styleComponent
│  │  │  ├─ _button.scss
│  │  │  ├─ _cartDropdown.scss
│  │  │  ├─ _categories.scss
│  │  │  ├─ _footer.scss
│  │  │  ├─ _navigation.scss
│  │  │  ├─ _productCard.scss
│  │  │  ├─ _productEdit.scss
│  │  │  └─ _subcribe.scss
│  │  ├─ stylePages
│  │  │  ├─ _cartPage.scss
│  │  │  ├─ _home.scss
│  │  │  ├─ _loginLogout.scss
│  │  │  ├─ _newProduct.scss
│  │  │  ├─ _productList.scss
│  │  │  ├─ _productRoute.scss
│  │  │  └─ _searchResult.scss
│  │  └─ styles.scss
│  ├─ test
│  │  ├─ reducer
│  │  │  ├─ cartItemsReducer.test.ts
│  │  │  ├─ categoriesReducer.test.ts
│  │  │  ├─ productReducer.test.ts
│  │  │  ├─ searchTagReducer.test.ts
│  │  │  ├─ singleProductReducer.test.ts
│  │  │  ├─ sortCategoryReducer.test.ts
│  │  │  └─ userReducer.test.ts
│  │  └─ shared
│  │     └─ server.ts
│  └─ types
│     ├─ ButtonType.ts
│     ├─ CartItemType.ts
│     ├─ Category.ts
│     ├─ LoginType.ts
│     ├─ NewProductType.ts
│     ├─ ProductCardList.ts
│     ├─ ProductType.ts
│     └─ UserType.ts
└─ tsconfig.json

```
