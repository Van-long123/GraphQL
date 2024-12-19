import { gql } from "apollo-server-express";
export const typeDefsArticle = gql`
    type Article {
        id:ID,
        title:String,
        avatar:String,
        description:String,
        category:Category
    }
    # lấy danh sách bài viết theo tiêu chí ví dụ như sắp xếp tăng dần theo title thì rest api có query trên đường link api
    # 
    type Query {
        hello: String,
        # getListArticle:[Article],
        getListArticle(
            sortKey:String,
            sortValue:String,
            # gán giá trị mặc định
            curentPage:Int = 1,
            limitItems:Int = 2 ,
            filterKey:String,
            filterValue:String,
            keyword:String,
            ):[Article],
        getArticle(id:ID):Article,

    }
    input ArticleInput {
        title:String,
        avatar:String,
        description:String,
        categoryId:String
    }
   
    type Mutation {
        createArticle(article: ArticleInput) : Article,
        deleteArticle(id:ID): String,
        updateArticle(id:ID,article: ArticleInput): Article,
    }
`;