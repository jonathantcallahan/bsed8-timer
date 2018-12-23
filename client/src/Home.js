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
            task: {
                task: 'example title',
                subtasks: ['subtask 1','subtask 2','subtask 3'],
                records: ['0001234','0002343','002342','0002342']
            }
        }
        this.logState = this.logState.bind(this)
    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(d => this.setState(state => { return {taskList:d.data}}))
            .catch(e => console.log(e))
        Axios.post('http://localhost:3002/api/create-new-task')
            .then(d => console.log(d))
            .catch(e => console.log(e))
    }
    logState(){console.log(this.state)}
    render(){
        return(
            <div>
                <SmallTimer/>
                <CreateTask/>
                <Timer timerInfo={{...this.state.task}} />
                <div onClick={this.logState}>state</div>
            </div>
        )
    }
}

export default Home