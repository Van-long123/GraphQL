import Article from "../model/article.model";
import Category from "../model/category.model";

export const resolversArticle={
    // Query và Mutation là cố định 
    Query:{
        getListArticle:async ( _ , args)=>{
            const {sortKey,sortValue,curentPage,limitItems,filterKey,filterValue,keyword}=args
            let find={
                deleted:false
            }
            //sort
            let sort={}
            if(sortKey && sortValue){
                sort[sortKey]=sortValue
            }
            //end sort
            // pagination 
            let skip=(curentPage-1)*limitItems;
            // pagination 
            //Bộ lọc 
            if(filterKey && filterValue){
                find[filterKey]=filterValue
            }
            //Bộ lọc 

            //search
            //nếu muốn tìm kiếm theo mô tả đồ nữa thì tồi lại là keywordKey và keywordValue
            if(keyword){
                find['title']=new RegExp(keyword,'i')
            }
            //search
            const articles=await Article.find(find)
            .sort(sort)
            .limit(limitItems)
            .skip(skip)
            return articles
        },

        getArticle:async ( _ , args)=>{
            const {id}=args;
            const article=await Article.findOne({
                _id:id,
                deleted:false
            })
            return article
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
    }
}