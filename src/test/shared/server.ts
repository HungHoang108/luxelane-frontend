import { rest } from "msw";
import { setupServer } from "msw/node";
import { NewProductType } from "../../types/new-product.type";
import jwt from "jsonwebtoken";

let productTest = [
  {
    id: 1,
    title: "C",
    price: 491,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=8827",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5418",
    ],
  },
  {
    id: 2,
    title: "A",
    price: 500,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 2,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=8827",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5418",
    ],
  },
  {
    id: 3,
    title: "B",
    price: 150,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 5,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=8827",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5418",
    ],
  },
];
const categories = [
  {
    id: 1,
    name: "Clothes",
    image: "https://api.lorem.space/image/fashion?w=640&h=480&r=9695",
    creationAt: "2023-01-05T22:20:42.000Z",
    updatedAt: "2023-01-06T13:48:17.000Z",
  },
  {
    id: 2,
    name: "Electronics1",
    image: "https://api.lorem.space/image/watch?w=640&h=480&r=3002",
    creationAt: "2023-01-05T22:20:42.000Z",
    updatedAt: "2023-01-06T13:48:58.000Z",
  },
  {
    id: 3,
    name: "Change title",
    image: "https://api.lorem.space/image/furniture?w=640&h=480&r=8056",
    creationAt: "2023-01-05T22:20:42.000Z",
    updatedAt: "2023-01-06T15:57:58.000Z",
  },
];
const users = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6440",
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "changemeh",
    name: "Jhonh",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=64440",
  },
];
const handler = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(productTest));
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const product: NewProductType = await req.json();
      if (product.price < 1) {
        return res(ctx.status(400, "Data is invalid"));
      }
      return res(ctx.json(product));
    }
  ),
  // rest.delete(`https://api.escuelajs.co/api/v1/products/1`,
  //   async (req, res, ctx) => {

  //       const productIndex = productTest.findIndex(
  //         (product) => product.id === 1
  //       );
  //       console.log("product Index",productIndex)
  //       if (productIndex !== -1) {
  //         const test2 = productTest.filter((item) => item.id !== 1);
  //         // const test = res(ctx.json(productTest));
  //         console.log("teset", res(ctx.json(test2)));
  //         // return res(ctx.json(test2))
  //       } else {
  //         return res(ctx.status(404));
  //       }
  //     }
  // ),
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(categories));
  }),
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        const access_token = jwt.sign(foundUser, "loginKey");
        return res(ctx.json({ access_token }));
      } else {
        return res(ctx.status(401, "Unauthorized"));
      }
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    const access_tokenArr = req.headers.get("Authorization")?.split(" ");
    if (access_tokenArr) {
      const access_token = access_tokenArr[1];
      const foundUser = jwt.verify(access_token, "loginKey");
      return res(ctx.json(foundUser));
    } else {
      return res(ctx.status(401, "Unauthorized"));
    }
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/files/upload",
    async (req, res, ctx) => {
      const file: File = await req.json();
      console.log(file)
      return res(
        ctx.json({
          originalname: file.name,
          filename: file.name,
          location: `https://api.escuelajs.co/api/v1/files/${file.name}`,
        })
      );
    }
  ),
  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const product: NewProductType = await req.json();
      if (product.price < 1000) {
        return res(ctx.status(400, "data is invalid"));
      }
      return res(ctx.json(product));
    }
  ),
];

const server = setupServer(...handler);
export default server;
