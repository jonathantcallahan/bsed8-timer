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
            records: []
        }
        this.logState = this.logState.bind(this)
        this.handler = this.handler.bind(this)
    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(d => this.setState(state => { return {taskList:d.data}}))
            .catch(e => console.log(e))
    }
    logState(){console.log(this.state)}
    handler(s){
        // console.log(s)
        this.setState({
            task:s.task,
            subtasks:s.subtasks,
            records:s.records
        })
    }
    render(){
        return(
            <div>
                <SmallTimer handler={this.handler} />
                <CreateTask/>
                {this.state.task.length && <Timer timerInfo={{...this.state}} />}
            </div>
        )
    }
}

export default Home