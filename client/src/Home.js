import React, { Component } from 'react'
import Timer from './Timer'
import SmallTimer from './SmallTimers'
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
    }
    logState(){console.log(this.state)}
    render(){
        return(
            <div>
                <SmallTimer/>
                <Timer timerInfo={{...this.state.task}} />
                <div onClick={this.logState}>state</div>
            </div>
        )
    }
}

export default Home