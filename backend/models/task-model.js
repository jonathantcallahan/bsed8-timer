import mongoose from 'mongoose'
const Schema = mongoose.Schema

const taskSchema = new Schema({
    user: String,
    task: String,
    subtasks: Array,
    records: Array
})

export default mongoose.model('task', taskSchema)