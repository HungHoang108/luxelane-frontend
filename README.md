# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9-green)
![SASS](https://img.shields.io/badge/SASS-v.4.9-hotpink)

Live demo [here](https://luxelane.netlify.app/)

## Overview

Backend: [https://luxelane.azurewebsites.net/swagger/index.html](https://luxelane.azurewebsites.net/swagger/index.html)

## Features

1. Get all products, find a single products, sort products by categories and price
2. Register for a new account, login with Email and password
3. Customer account can create new product
4. Admin can create, delete and edit product. Testing account:
   - Email: admin@mail.com
   - Password: admin123
5. Add product to cart, remove products, update products's quantity in cart
6. Light/Dark mode
7. Backend is built with C# and .Net core API

## Future features


- Add favourite products
- Add new and delete categories
- Add new and delete orders
- Check out route and payment


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


```

```
fs13-frontend-project
├─ .gitignore
├─ package.json
├─ public
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ Button.tsx
│  │  ├─ Cart.tsx
│  │  ├─ Category.tsx
│  │  ├─ DarkMode.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Navigation.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductEditForm.tsx
│  │  ├─ Root.tsx
│  │  ├─ Subcribe.tsx
│  │  └─ UserPopUp.tsx
│  ├─ hooks
│  │  └─ reduxHook.ts
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ Authentication.tsx
│  │  ├─ CartPage.tsx
│  │  ├─ CategoryPage.tsx
│  │  ├─ Home.tsx
│  │  ├─ NewProduct.tsx
│  │  ├─ ProductList.tsx
│  │  ├─ SearchResult.tsx
│  │  ├─ SingleProduct.tsx
│  │  └─ UserProfile.tsx
│  ├─ react-app-env.d.ts
│  ├─ redux
│  │  ├─ cartItemsReducer.ts
│  │  ├─ categoryReducer.ts
│  │  ├─ darkModeReducer.ts
│  │  ├─ productReducer.ts
│  │  ├─ searchTagReducer.ts
│  │  ├─ singleProductReducer.ts
│  │  ├─ store.ts
│  │  └─ userReducer.ts
│  ├─ setupTests.ts
│  ├─ styles
│  │  ├─ image
│  │  │  ├─ Copy of Copy of Untitled (1).jpg
│  │  │  └─ homepage.jpg
│  │  ├─ styleComponent
│  │  │  ├─ _button.scss
│  │  │  ├─ _cartDropdown.scss
│  │  │  ├─ _categories.scss
│  │  │  ├─ _footer.scss
│  │  │  ├─ _navigation.scss
│  │  │  ├─ _productCard.scss
│  │  │  ├─ _productEdit.scss
│  │  │  ├─ _subcribe.scss
│  │  │  └─ _userPopup.scss
│  │  ├─ stylePages
│  │  │  ├─ _cartPage.scss
│  │  │  ├─ _home.scss
│  │  │  ├─ _loginLogout.scss
│  │  │  ├─ _newProduct.scss
│  │  │  ├─ _productList.scss
│  │  │  ├─ _productRoute.scss
│  │  │  ├─ _searchResult.scss
│  │  │  └─ _userProfile.scss
│  │  ├─ styles.scss
│  │  └─ _app.scss
│  ├─ test
│  │  ├─ reducer
│  │  │  ├─ cartItemsReducer.test.ts
│  │  │  ├─ categoriesReducer.test.ts
│  │  │  ├─ productReducer.test.ts
│  │  │  ├─ searchTagReducer.test.ts
│  │  │  ├─ singleProductReducer.test.ts
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
