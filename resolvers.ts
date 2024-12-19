// ở trong resolvers định nghĩa cái hàm mà khi gọi đến hàm đó thì sẽ thực hiện 1 logic nà nào đó nó na ná controller 
// Query và  type Query là cố định 

import Article from "./model/article.model"
import Category from "./model/category.model"

// dưới có chữ hello thì trên type Query  cũng có hello kiểu string nên trả về string
export const resolvers={
    // Query và Mutation là cố định 
    Query:{
        hello:()=>{
            return 'hello'
        },
        getListArticle:async ()=>{
            const articles=await Article.find({
                deleted:false
            })
            //mảng này sẽ có từ khóa deleted nhưng bên typeDefs ta định nghĩa 
            // hàm đó các data trả về chỉ có các trường trong object đó 
            return articles
        },
        //có 2 tham số tham số đầu tiên chưa dùng để _ 
        // tham số thứ 2 là args (là 1 object) là các đối số truyền vào ở typeDefs
        /*
            {
                id:'1312321'
            }
        */
        getArticle:async ( _ , args)=>{
            const {id}=args;
            const article=await Article.findOne({
                _id:id,
                deleted:false
            })
            return article
        },


        getListCategory:async ()=>{
            const categories=await Category.find({
                deleted:false
            })
            return categories
        },

        getCategory:async ( _ , args)=>{
            const {id}=args;
            const category=await Category.findOne({
                _id:id,
                deleted:false
            })
            return category
        },
    },
    // Article này đặt tên giống với mẫu type Article bên typeDefs 
    // trong mẫu type Article có category ta thêm category vào Article dưới
    //ta hình dung như sau khi người ta gọi vào hàm getListArticle nó sẽ lấy ra 1 mảng các bài viết 
    // nó sẽ lặp qua từng Article mỗi lần lặp qua Article nó sẽ chạy vào đây
    // là kiểu khi chạy getListArticle trả về 1 mảng chứa các Article thì nó sẽ duyệt qua từng phần tử 
    // để xem có đúng với nguyên mẫu ko và mỗi lần lặp tới category:Category thì nó sẽ vào category:(article)=>{) (nhớ là tương ứng với Article 
    // 2 cái key Article và category giống bên typeDefs) và nhận đc Article đó 
    Article:{
        //trong hàm này ta return về 1 object giống với mẫu Category bên typeDefs 
        category:async (article)=>{
            const categoryId=article.categoryId;
            const category=await Category.findOne({
                _id: categoryId,
                deleted:false
            })  
            // khi return category  thì lấy giá trị đó gán vào biến category bên typedefs chõ nguyên mẫu Article
            return category          
        }
    },
    Mutation: {
        createArticle:async (_, args)=>{
            const {article}=args;
            const record=new Article(article)
            await record.save();
            return record
        },
        deleteArticle:async (_, args)=>{
            const {id}=args;
            await Article.updateOne({
                _id:id
            },{
                deleted:true,
                deletedAt:new Date()
            })
            return "Đã xóa"
        },
        updateArticle:async (__dirname, args)=>{
            const {id,article}=args;
            await Article.updateOne({
                _id:id,
                deleted:false
            },article)
            const record=Article.findOne({
                _id:id,
                deleted:false
            })
            return record
        },


        createCategory:async (_, args)=>{
            const {category}=args;
            const record=new Category(category)
            await record.save();
            return record
        },
        deleteCategory:async (_, args)=>{
            const {id}=args;
            await Category.updateOne({
                _id:id
            },{
                deleted:true,
                deletedAt:new Date()
            })
            return "Đã xóa"
        },
        updateCategory:async (__dirname, args)=>{
            const {id,category}=args;
            await Category.updateOne({
                _id:id,
                deleted:false
            },category)
            const record=Category.findOne({
                _id:id,
                deleted:false
            })
            return record
        }


    }
}