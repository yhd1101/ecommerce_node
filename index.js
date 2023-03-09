import express from "express"
const app = express()

import productRoutes from "./routes/product.js"
import orderRoutes from "./routes/order.js"



// routing
app.use("/product", productRoutes)
app.use("/order", orderRoutes)



const port = 8000

app.listen(port,console.log("Server started"))












// 코드 빌드 순서
//1.위에서 아래로 먼저 인식
//2.=기준으로 오른쪽에서 왼쪽으로 치환한다.
//3.()함수들의 모음으로 해석한다.
//4. .은 하위 메소드를 호출하는 명령어이다
//5. ,는 그리고로 해석한다