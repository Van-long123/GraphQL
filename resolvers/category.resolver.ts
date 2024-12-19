import Article from "../model/article.model"
import Category from "../model/category.model"
export const resolversCategory={
    // Query và Mutation là cố định 
    Query:{
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