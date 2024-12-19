import mongoose from 'mongoose';
//ko viết tự tạo token mặc định trong model
const userSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token:String,
    deleted:{
        type:Boolean,
        default:false
    },
    deleteAt:Date,
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema,'users')
export default User;