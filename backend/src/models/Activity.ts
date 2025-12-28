import mongoose, { Schema, Document } from 'mongoose';

export enum ActivityCategory {
    WORK = 'Work',
    PERSONAL = 'Personal',
    FITNESS = 'Fitness',
    LEARNING = 'Learning',
    SOCIAL = 'Social',
    OTHER = 'Other'
}

export enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High'
}

export interface IActivity extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    category: ActivityCategory;
    startTime: Date;
    endTime: Date;
    isCompleted: boolean;
    priority: Priority;
}

const ActivitySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: Object.values(ActivityCategory), default: ActivityCategory.OTHER },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: Object.values(Priority), default: Priority.MEDIUM }
}, { timestamps: true });

export default mongoose.model<IActivity>('Activity', ActivitySchema);
