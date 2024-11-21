import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://i.pinimg.com/736x/dc/36/53/dc36533b923cf49f487453958a7a044c.jpg"
    }
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;
