import mongoose, { Schema, Document } from 'mongoose';

export interface IUserPreferences extends Document {
    userId: mongoose.Types.ObjectId;
    theme: 'light' | 'dark';
    emailNotifications: boolean;
    defaultActivityDurationMinutes: number;
}

const UserPreferencesSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'dark' },
    emailNotifications: { type: Boolean, default: true },
    defaultActivityDurationMinutes: { type: Number, default: 60 }
});

export default mongoose.model<IUserPreferences>('UserPreferences', UserPreferencesSchema);
