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
            newTask: []
        }
        this.logState = this.logState.bind(this)
        this.handler = this.handler.bind(this)
        this.forceUpdate = this.forceUpdate.bind(this)
    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(d => this.setState(state => { return {taskList:d.data}}))
            .catch(e => console.log(e))
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
    forceUpdate(task){
        this.setState({newTask:task})
    }
    render(){
        return(
            <div>
                <SmallTimer handler={this.handler} newTask={this.state.newTask} />
                <CreateTask update={this.forceUpdate} />
                {this.state.task.length && <Timer timerInfo={{...this.state}} />}
            </div>
        )
    }
}

export default Home