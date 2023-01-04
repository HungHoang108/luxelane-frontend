import { rest } from "msw";
import {setupServer} from "msw/node"
import { NewProductType } from "../../../types/new-product.type";

const handler = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        return res(
            ctx.json(
                [
                    {
                        id: 1,
                        title: "C",
                        price: 491,
                        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                        category: {
                            "id": 4,
                            "name": "Shoes",
                            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=8827"
                        },
                        images: [
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=5418"
                        ]
                    },
                    {
                        id: 2,
                        title: "A",
                        price: 500,
                        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                        category: {
                            "id": 2,
                            "name": "Shoes",
                            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=8827"
                        },
                        images: [
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=5418"
                        ]
                    },
                    {
                        id: 3,
                        title: "B",
                        price: 150,
                        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                        category: {
                            "id": 5,
                            "name": "Shoes",
                            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=8827"
                        },
                        images: [
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
                            "https://api.lorem.space/image/shoes?w=640&h=480&r=5418"
                        ]
                    }
                ]
            )
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products/",async(req, res, ctx) => {
        const product: NewProductType = await req.json()
        if (product.price < 1000) {
            return res(
                ctx.status(400, "Data is invalid")
            )
        }
        return res(
            ctx.json(product)
        )
    })
]

const server = setupServer(...handler)
export default server