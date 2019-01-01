import React, { Component } from 'react'
import Axios from 'axios';

class CreateTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            task: '',
            subtask: '',
            subtasks: [],
            status: ''

        }
        this.create = this.create.bind(this)
        this.addSubtask = this.addSubtask.bind(this)
        this.update = this.update.bind(this)
    }
    create(){
        const task = this.state;
        task.records = []
        delete task['status']
        delete task['subtask']
        Axios.post('http://localhost:3002/api/create-new-task',task)
            .then(r => this.setState({status:'Task Created'}))
            .catch(e => this.setState({status:e}))
        this.setState({
            task:'',
            subtask:'',
            subtasks:[]
        })
    }
    update({target}){
        //console.log(target.value)
        this.setState({
            status:'',
            [target.name]:target.value
        })
    }
    addSubtask(e){
        if(e.key === 'Enter'){
            const t = this.state.subtasks.concat(this.state.subtask)
            this.setState({subtasks:t,subtask:''}, console.log(this.state))
        }
    }
    render(){
        return(
            <div>
                <span>Create new task</span>
                <input 
                    type='text' 
                    name='task' 
                    value={this.state.task} 
                    onChange={this.update}></input>
                <input type='text' 
                    name='subtask' 
                    value={this.state.subtask} 
                    onChange={this.update}
                    onKeyUp={this.addSubtask}></input>
                <div onClick={this.create}>Create</div>
                <div>{this.state.status}</div>
                {this.state.subtasks.map((e,i) => {
                    return <div key='{i}'>subtask {i}: {e}</div>
                })}
            </div>
        )
    }
}

export default CreateTimer