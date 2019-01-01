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
        res.send('asdf')
    })
    app.post('/api/create-new-task', (req,res) => {
        console.log(req.body)
        const t = new Task(req.body)
        t.save()
            .then(r => res.send(r))
            .catch(e => res.send(e))
    })
    app.post('/api/update-task-records', (req,res) => {
        console.log(req.body)
        const t = new Timer(req.body)
        t.save()
            .then(d => console.log(d))
            .catch(e => console.log(e))
        console.log(t)
        res.send('asdf')
    })
}