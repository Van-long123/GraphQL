import {Request,Response,NextFunction} from 'express';
import User from '../model/user.model';

export const requireAuth=async (req:Request, res:Response,next:NextFunction):Promise<void>=>{
    if(req.headers.authorization){
        const token:string=req.headers.authorization.split(' ')[1];
        
        const user=await User.findOne({
            token:token,
            deleted:false 
        }).select('-password')
        if(user){
            //để lấy được dữ liệu thì phải định nghĩa thêm context ở index.js phần new ApolloServer
           req['user']=user
        }
    }

    next()
}