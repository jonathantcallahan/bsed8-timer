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
        Axios.get('http://localhost:3002/api/get-task-details')
            .then(d => {
                console.log(d)
                d.data.forEach(e => {
                    console.log(e)
                    if(this.state[e.task]){
                        const c = this.state[e.task]
                        c.push(e.total)
                        console.log(e.task,c)
                        this.setState({[e.task]:c})
                    } else {
                        this.setState({
                            [e.task]:[e.total]
                        }, ()=> {console.log(this.state)})
                    }
                })
            })
            .catch(e => console.log(e))
    }
    selectTask({target}){
        this.props.handler(this.state.tasks[target.id])
    }
    render(){
        return (
            <div className='task-list-container'>
                <div className='task-list-title'>TASK LIST</div>
                {this.state.tasks.length && this.state.tasks.map((e,i) => {
                    return e.subtasks.length ? (
                        <div 
                            id={i}
                            className='task-list-task' 
                            onClick={this.selectTask}>{e.task}
                            <span id={i}>
                            {this.state[e.task] && this.state[e.task].map((val,i)=>{
                                return <div className='task-list-bar' style={{height:`${((Math.max(...this.state[e.task]))/val)*100}%`}}></div>
                            })}
                            </span>    
                        </div>
                    ) : ''
                })}
            </div>
        )
    }
}

export default SmallTimer