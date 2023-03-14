import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser";
import dotEnv from "dotenv"
const app = express()
dotEnv.config()

import productRoutes from "./routes/product.js"
import orderRoutes from "./routes/order.js"

// 설정
app.use(morgan("commonn"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// routing
app.use("/product", productRoutes)
app.use("/order", orderRoutes)




const port = process.env.PORT || 9090

app.listen(port,console.log("Server started"))












// 코드 빌드 순서
//1.위에서 아래로 먼저 인식
//2.=기준으로 오른쪽에서 왼쪽으로 치환한다.
//3.()함수들의 모음으로 해석한다.
//4. .은 하위 메소드를 호출하는 명령어이다
//5. ,는 그리고로 해석한다