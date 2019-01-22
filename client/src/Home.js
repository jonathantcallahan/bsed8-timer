import React, { Component } from 'react'
import Timer from './Timer'
import SmallTimer from './SmallTimers'
import CreateTask from './CreateTask'
import timerApi from './scripts/timerApi'
import Axios from 'axios';


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            taskList: [],
            task: '',
            subtasks: [],
            records: [],
            newTask: [],
            tasks: [],
            task_ids: []
        }
        this.logState = this.logState.bind(this)
        this.handler = this.handler.bind(this)
        this.forceUpdate = this.forceUpdate.bind(this)
        this.getTasks = this.getTasks.bind(this)
    }
    getTasks(){
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(data => this.setState({tasks:data.data}) )
            .catch(err => console.log(err))
        Axios.get('http://localhost:3002/api/get-task-details')
            .then(d => {
                console.log(d)
                d.data.forEach(e => {
                    const ids = this.state.task_ids
                    ids.push(e._id)
                    this.setState({task_ids:ids})
                    if(this.state[`t_${e.task}`]){
                        const c = this.state[`t_${e.task}`]
                        c.push(e.total)
                        this.setState({[`t_${e.task}`]:c})
                    } else {
                        this.setState({
                            [`t_${e.task}`]:[e.total]
                        }, () => {console.log(this.state, 'total')})
                    }
                });
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }
    componentDidMount(){
        console.log('asdf')
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(d => this.setState(state => { return {taskList:d.data}}))
            .catch(e => console.log(e))
        // this.getTasks()
    }
    logState(){console.log(this.state)}
    handler(s){
        console.log(s, 'handler')
        this.setState({
            task:s.task,
            subtasks:s.subtasks,
            records:s.records
        })
    }
    render(){
        return(
            <div>
                <SmallTimer handler={this.handler} getTasks={this.getTasks} s={{...this.state}} />
                <CreateTask getTasks={this.getTasks}/>
                {this.state.task.length && <Timer timerInfo={{...this.state}} />}
            </div>
        )
    }
}

export default Home