import express from 'express';
// const app = express()

export default (app,Task) => {
    app.get('/api/get-all-tasks', (req,res) => {
        res.send('asdf')
    })
    app.get('/api/get-task-details', (req,res) => {
        res.send('asdf')
    })
    app.post('/api/create-new-task', (req,res) => {
        console.log(req.body)
        const t = new Task()
        res.send('asdf')
    })
    app.post('/api/update-task-records', (req,res) => {

    })
}