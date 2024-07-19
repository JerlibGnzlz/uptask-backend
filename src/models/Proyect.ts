import mongoose, { Schema, Document } from "mongoose";


export type ProtectType = Document & {
    projectName: string
    clientName: string
    description: string
}


const projectSchema: Schema = new Schema({
    projectName: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    clientName: {
        type: String,
        require: true,
        lowercase: true

    },
    description: {
        type: String,
        lowercase: true
    }
}, {
    timestamps: false,
    versionKey: false
})


export const Project = mongoose.model<ProtectType>("Project", projectSchema)