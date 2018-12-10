import axios from 'axios'

export default {
    createTask: data => {
        axios
            .post('http://localhost:3002/api/create-new-task', data)
            .then(d => console.log(d))
            .catch(e => console.log(e))
    },
    updateTask: () => {},
    getAllTasks: that => {
        axios
            .get('http://localhost:3002/api/get-all-tasks')
            .then(d => {
                return d.data
            })
            .catch(e => console.log(e))
    },
    getTaskDetails: () => {}
}