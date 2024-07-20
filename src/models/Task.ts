import mongoose, { Schema, Document } from "mongoose";


export type TaskType = Document & {
    projectName: string
    clientName: string
    description: string
}


const taskSchema: Schema = new Schema({
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


export const Task = mongoose.model<TaskType>("Task", taskSchema)