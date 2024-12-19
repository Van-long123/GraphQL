import { gql } from "apollo-server-express";
// FRONTEND GỬI TOKEN THÔNG QUA PHẦN HEADER 
//KHI TRUY CẬP VÀO PRIVATE ROUTE THÌ BACKEND SẼ CHECK TOKEN NẾU OK MỚI CHO VÀO
export const typeDefsUser = gql`
    # User cho phép người dùng đc phép láya
    type User{
        id:ID,
        fullName:String,
        email:String,
        token:String,
        code:Int,
        message:String
    }
    type Query {
        # ko dùng id dùng token 
        getUser : User
    }
    # lấy danh sách bài viết theo tiêu chí ví dụ như sắp xếp tăng dần theo title thì rest api có query trên đường link api
    # đây là input bắt người ta nhập vào nếu mà khác thì báo lỗi
    input RegisterUserInput {
        fullName:String,
        email:String,
        password:String,
    }
    input LoginUserInput {
        email:String,
        password:String,
    }
    type Mutation {
        registerUser(user: RegisterUserInput) : User,
        loginUser(user: LoginUserInput) : User,
    }
`;