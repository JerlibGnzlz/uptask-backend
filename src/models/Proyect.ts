import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";


export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[]
}


const projectSchema: Schema = new Schema({
    projectName: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    clientName: {
        type: String,
        require: true,
        trim: true,
        lowercase: true

    },
    description: {
        type: String,
        trim: true,
        lowercase: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task"
        }
    ]
}, {
    timestamps: false,
    versionKey: false
})


export const Project = mongoose.model<IProject>("Project", projectSchema)