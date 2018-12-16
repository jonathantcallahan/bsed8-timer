import express from 'express';
// const app = express()

export default (app,Task) => {
    app.get('/api/get-all-tasks', (req,res) => {
        Task
            .find()
            .then(d => res.json(d))
            .catch(e => res.status(422).json(e))
    })
    app.get('/api/get-task-details', (req,res) => {
        res.send('asdf')
    })
    app.post('/api/create-new-task', (req,res) => {
        console.log(req.body)
        const t = new Task()
        t.user = 'sample user'
        t.task = 'task name'
        t.subtasks = ['subtask1','subtask2','subtask3']
        t.records = ['000234','000022','000012','000010']
        console.log(t)
        t.save()
        res.send('asdf')
    })
    app.post('/api/update-task-records', (req,res) => {

    })
}