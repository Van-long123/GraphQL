// typeDefs nó đóng vai trò như model (kiểu ta định nghĩa các key thì cho phép người dung đc truy vấn
// vào còn ko định nghĩa thì ko truy vấn đc )

import { gql } from "apollo-server-express";

// trong type Query định nghĩa các key cho frontend đc truy vấn 
// khi chạy key đó thì sẽ chạy hàm tương ứng với cái key ở resolvers
// data trong mảng getListArticle phải tuân thủ key trong object Article này
// là nó nó chỉ lấy các key đó thôi còn khác key đó thì ko lấy đc ( kiểu ko có deleted trong object
// đó thì sẽ ko lấy ra deleted đó)

// getArticle (lấy chi tiết 1 bài viết)
//trả về 1 mảng có các phần tử là 1 object thì thêm Article còn trả về 1 bài viết thì ko cần 
// khi muốn lấy ra 1 bài viết thì phải bt id của bài viết đó thì thêm () để cho phép front gửi lên 1 id 

//thêm mới 1 bài viết 
//Định nghĩa phần thêm mới 
// type Mutation cố định (muốn sửa xóa thì đều làm trong nó )
// createArticle : Article để như này là kiểu tạo xong là lấy đc data luôn
//phải bắt frontend gửi lên một kiểu gì đó  để tránh trường hợp thêm key linh tinh khác database vì vậy ta phải định nghĩa mẫu db gửi lên
// định nghĩa mẫu gửi lên ở createArticle (đây): 

//xóa 1 bài viết 
// deleteArticle(id:ID): String     String này là dữ liệu trả về là 1 chuỗi

// lấy ra bài viết kèm thông tin danh mục 
// category:Category 

//CHÚ Ý LÀ CHỈ CẦN KHÁC MẪU LÀ SẼ LỖI 
export const typeDefs = gql`
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