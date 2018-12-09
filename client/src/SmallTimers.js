import React, { Component } from 'react'
import timerApi from './scripts/timerApi'

class SmallTimer extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        timerApi.createTask({task:'sample task name',subtasks:['subtask 1','subtask 2','subtask 3']})
    }
    render(){
        return (
            <div>
                <span>small timer</span>
            </div>
        )
    }
}

export default SmallTimer