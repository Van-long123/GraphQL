import Article from "../model/article.model";
import Category from "../model/category.model";
import User from "../model/user.model";
import md5 from 'md5'
import * as generate from '../helpers/generate'
export const resolversUser={
    Query: {
        getUser:async(_, args,context)=>{
            // console.log(context.user) //context h nó đóng vai trò như một request vì ta return về req
            // console.log(context.user.token)
            //CHÚ Ý KHI KIỂM TRA THÌ NẾU MÀ context.user RỖNG MÀ TA context.user.token SẼ BÁO LỖI VÌ NÓ RỖNG
            // CHỈ KIỂM TRA context.user ĐC THÔI RỖNG THÌ KO CHẤM VÀO
            if(context.user){
                const infoUser=await User.findOne({
                    token:context.user.token,
                    deleted:false
                })
                if(infoUser){
                    return {    
                        code:200,
                        message:"Success",
                        id:infoUser.id,
                        fullName:infoUser.fullName,
                        email:infoUser.email,
                        token:infoUser.token
                    }
                }
                else{
                    return {
                        code:400,
                        message:"Errors"
                    }
                }
            }
            else{
                return {
                    code:400,
                    message:"Errors"
                }
            }
            
        }
    },
    Mutation: {
        registerUser:async (_, args)=>{
            const {user}=args
            const exitEmail=await User.findOne({
                email:user.email,
                deleted:false
            })
            if(exitEmail){
                //nếu trùng thì trả về này nhưng sẽ ko đc hiển thị vì khác mẫu đc định nghĩa bên typeDefs
                return {
                    code:400,
                    message:"Email already exists"
                }
            }
            else{
                user.password=md5(user.password)
                user.token=generate.generateRandomString(30)
                // hãy tạo 1 object chớ đừng lưu thẳng như  const newUser=new User(user) này 
                // vì lỡ người ta gửi lên data thừa chính vì vậy tạo object để lưu cho rõràng
                //viết kiểu grapql thì ko ảnh hưởng vì có các mẫu rồi
                const newUser=new User(user)
                await newUser.save()
                return {
                    code:200,
                    message:"Success",
                    id:newUser.id,
                    fullName:newUser.fullName,
                    email:newUser.email,
                    token:newUser.token
                }
            }
        },
        
        loginUser:async (_, args)=>{
            const {email,password}=args.user
            const infoUser=await User.findOne({
                email:email,
                deleted:false
            })
            if(!infoUser){
                //nếu trùng thì trả về này nhưng sẽ ko đc hiển thị vì khác mẫu đc định nghĩa bên typeDefs
                return {
                    code:400,
                    message:"Email does not exist"
                }
            }
            if(md5(password)!==infoUser.password){
                return {
                    code:400,
                    message:"Error password"
                }
            }
            return {
                code:200,
                message:"Success",
                id:infoUser.id,
                fullName:infoUser.fullName,
                email:infoUser.email,
                token:infoUser.token
            }
        },
    }
}