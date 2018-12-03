import React, { Component } from 'react'
import Timer from './Timer'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            task: {
                task: 'example title',
                subtasks: ['subtask 1','subtask 2','subtask 3'],
                records: ['0001234','0002343','002342','0002342']
            }
        }
    }
    render(){
        return(
            <div>
                <Timer timerInfo={{...this.state.task}} />
            </div>
        )
    }
}

export default Home