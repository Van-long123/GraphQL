import { gql } from "apollo-server-express";
export const typeDefsCategory = gql`
    type Category {
        id:ID,
        title:String,
        avatar:String,
    }
    type Query {
        getListCategory:[Article],
        getCategory(id:ID):Article,
    }

    input CategoryInput {
        title:String,
        avatar:String,
    }
    type Mutation {
        createCategory(category: CategoryInput) : Category,
        deleteCategory(id:ID): String,
        updateCategory(id:ID,category: CategoryInput): Category,
    }
`;