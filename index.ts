import express, {Application ,Express,Request,Response} from 'express';
import dotenv from 'dotenv'
dotenv.config()
import * as database from './config/database'
import Article from './model/article.model';
import { ApolloServer, gql } from 'apollo-server-express';

//ko dùng 2 thằng typeDefs và resolvers nữa vì ta phải tách ra cho dễ quản lý
// import {typeDefs} from './typeDefs'
// import {resolvers} from './resolvers'
import { typeDefs } from './typeDefs/index.typeDefs';
import { resolvers } from './resolvers/index.resolver';
import { requireAuth } from './middlewares/auth.middleware';
// tách ra rồi ở dưới đổi typeDefs thành một mảng chứa 2 thằng này
//tối ưu thêm vì nếu có nhiều cái tydeDefs nhúng vào rất là dài vì thế tạo 1 file index.typeDefs.ts
// import { typeDefsArticle } from './typeDefs/article.tydeDefs';
// import { typeDefsCategory } from './typeDefs/category.typeDefs';


//REST API

// app.get('/articles',async (req:Request,res:Response)=>{
//     const articles=await Article.find({
//         deleted:false
//     })
//     res.json({
//         article:articles,
//     })
// })
const startServer=async () => {
    dotenv.config()
    database.connect();
    const app: Application = express();
    const port:number|string=process.env.PORT || 3000;
    //GraphQL
    app.use('/graphql',requireAuth)
    
    // bên frontend có thư viện khác là apolloClient 
    
    // khởi tạo 1 apollo server để chạy đc graphql 
    // const apolloServer= new ApolloServer({
    //     typeDefs,resolvers
    // })
    // biến typeDefs chứa mảng 
    const apolloServer= new ApolloServer({
        // typeDefs:[typeDefsArticle,typeDefsCategory],resolvers
        typeDefs:typeDefs,resolvers:resolvers,
        //sau khi chạy qua middlewareAuth sẽ chạy vào đây
        // và sau đó bên resolvers lấy đc nó ở tham số thứ 3
        context:({req,res})=>{
            return req
            // return {
            //     ...req
            // }
        }
    })

    await apolloServer.start()
    //sẽ lỗi app vì  "@types/express": "^4.17.17","express": "^4.21.2", ko cùng phiên bản
    // npm install @types/express@4.17.17 --save-dev

    apolloServer.applyMiddleware({ 
        app,
        path:"/graphql"
    });
    app.listen(port,()=>{
        console.log(`http://localhost:${port}/ `+port)
    })
}

// khi gọi hàm thì code trong đó sẽ chạy 
startServer()
