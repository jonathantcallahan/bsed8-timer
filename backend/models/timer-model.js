import mongoose from 'mongoose';
const Schema = mongoose.Schema

const timerSchema = new Schema({
    user: String,
    date: String,
    task: String,
    total: String,
    subtasks: [String]
}, { timestamps: true });

export default mongoose.model('timer', timerSchema)