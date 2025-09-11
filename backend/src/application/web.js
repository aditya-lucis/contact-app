import express from "express"
import { publicRouter } from "../route/public-api.js"
import { errorMiddleware } from "../middleware/error-middleware.js"
import { userRouter } from "../route/api.js"
import multer from "multer"

export const web = express()

const upload = multer()

web.use(express.json())
web.use(express.urlencoded({ extended: true }))
web.use(upload.none())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleware)