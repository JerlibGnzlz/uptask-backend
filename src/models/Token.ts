import mongoose, { Schema, Document, Types } from "mongoose";



export interface IToken extends Document {
    token: string
    user: string
    createdAt: Date
}


const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        require: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User"

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: "10m"
    },
}, {
    timestamps: true,
    versionKey: false
})


export const Token = mongoose.model<IToken>("Token", tokenSchema)