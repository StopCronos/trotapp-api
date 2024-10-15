import mongoose from 'mongoose';

const Accounts = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    status:{
        type: Boolean,
        default: false,
        require: true,
    }
},{timestamps:true});

const AccountsModel = mongoose.model("accounts", Accounts);

export default AccountsModel;