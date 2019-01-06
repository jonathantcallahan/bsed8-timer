import express from 'express';
// const app = express()

export default (app,Task,Timer) => {
    app.get('/api/get-all-tasks', (req,res) => {
        Task
            .find()
            .then(d => res.json(d))
            .catch(e => res.status(422).json(e))
    })
    app.get('/api/get-task-details', (req,res) => {
        Timer
            .find()
            .then(d => res.json(d))
            .catch(e => res.send(e))
    })
    app.post('/api/create-new-task', (req,res) => {
        console.log(req.body)
        const t = new Task(req.body)
        t.save()
            .then(r => res.send(r))
            .catch(e => res.send(e))
    })
    app.post('/api/update-task-records', (req,res) => {
        const t = new Timer(req.body)
        console.log(t)
        t.save()
            .then(d => res.send(d))
            .catch(e => res.send(e))
        console.log(t)
    })
}