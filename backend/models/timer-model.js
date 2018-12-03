import mongoose from 'mongoose';
const Schema = mongoose.Schema

const timerSchema = new Schema({
    user: String,
    date: String,
    task: String,
    subtasks: {
        type: Map,
        of: Array
    }
}, { timestamps: true });

export default mongoose.model('timer', timerSchema)