"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
    type Article {
        id:ID,
        title:String,
        avatar:String,
        description:String,
        category:Category
    }

    type Category {
        id:ID,
        title:String,
        avatar:String,
    }

    type Query {
        hello: String,
        getListArticle:[Article],
        getArticle(id:ID):Article,

        getListCategory:[Article],
        getCategory(id:ID):Article,
    }
    input ArticleInput {
        title:String,
        avatar:String,
        description:String,
        categoryId:String
    }
    input CategoryInput {
        title:String,
        avatar:String,
    }
    type Mutation {
        createArticle(article: ArticleInput) : Article,
        deleteArticle(id:ID): String,
        updateArticle(id:ID,article: ArticleInput): Article,

        createCategory(category: CategoryInput) : Category,
        deleteCategory(id:ID): String,
        updateCategory(id:ID,category: CategoryInput): Category,
    }
`;
