import express from 'express';
const app = express()

export default (app,Task) => {
    app.get('/api/task', (req,res) => {
        const t = new Task()
        t.user = 'username'
        t.task = 'sample task'
        t.subtasks = ['sample subtask 1','sample subtask 2']
        t.records = ['12.111','12324.04']
        console.log(t)
        console.log('asdf')
        res.send('asdf')
    })
}