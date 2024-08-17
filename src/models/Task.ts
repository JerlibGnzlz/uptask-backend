import mongoose, { Schema, Document, Types } from "mongoose";


const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEW: "underReview",
    COMPLETE: "complete"
} as const


export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]


export interface ITask extends Document {
    name: string
    description: string,
    project: mongoose.Schema.Types.ObjectId,
    status: TaskStatus
}


const taskSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        lowercase: true
    },
    project: {
        type: Types.ObjectId,
        ref: "Project"
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false
})


export const Task = mongoose.model<ITask>("Task", taskSchema)