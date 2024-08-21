import mongoose, { Schema, Document, Types } from "mongoose";



export interface IUser extends Document {
    name: string
    email: string
    password: string
    confirmed: boolean,
}


const userSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
        require: true,
    }

}, {
    timestamps: true,
    versionKey: false
})


export const User = mongoose.model<IUser>("User", userSchema)