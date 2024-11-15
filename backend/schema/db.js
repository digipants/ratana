import mongoose from "mongoose";


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
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/.png/200px-Fels_silvestris_silvestris_small_gradual_decrease_of_quality.png"
    }
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;

//  https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYj2b2hWTE5DQ6ooUY7Ref0VhrLVimPW5Yg&s