import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://e1.pxfuel.com/desktop-wallpaper/719/197/desktop-wallpaper-kaicons-default-boy-pfp.jpg"
      },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;