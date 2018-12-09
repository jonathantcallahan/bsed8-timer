import axios from 'axios'

export default {
    createTask: data => {
        axios
            .post('/api/create-new-task', data)
            .then(d => console.log(d))
            .catch(e => console.log(e))
    },
    updateTask: () => {},
    getTaskDetails: () => {}
}