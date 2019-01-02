import React, { Component } from 'react'
import timerApi from './scripts/timerApi'
import Axios from 'axios';

class SmallTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks:[]
        }
        this.selectTask = this.selectTask.bind(this)
    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(data => {
                // console.log(data.data)
                this.setState({tasks:data.data})
            })
            .catch(err => console.log(err))
    }
    selectTask({target}){
        this.props.handler(this.state.tasks[target.id])
    }
    render(){
        return (
            <div className='task-list-container'>
                <div className='task-list-title'>TASK LIST</div>
                {this.state.tasks.length && this.state.tasks.map((e,i) => {
                    return(
                        <div 
                            id={i}
                            className='task-list-task' 
                            onClick={this.selectTask}>{e.task}</div>
                    )
                })}
            </div>
        )
    }
}

export default SmallTimer