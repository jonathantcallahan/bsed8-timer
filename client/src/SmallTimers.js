import React, { Component } from 'react'
import timerApi from './scripts/timerApi'
import Axios from 'axios';

class SmallTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks:[],
            task_ids:[]
        }
        this.selectTask = this.selectTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
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
                    const ids = this.state.task_ids
                    ids.push(e._id)
                    this.setState({task_ids:ids}, console.log(this.state))
                    if(this.state[e.task]){
                        const c = this.state[e.task]
                        c.push(e.total)
                        //console.log(e.task,c,'tasks')
                        this.setState({[e.task]:c})
                    } else {
                        this.setState({
                            [e.task]:[e.total]
                        }, ()=> {console.log(this.state, 'total')})
                    }
                })
            })
            .catch(e => console.log(e))
    }
    selectTask({target}){
        this.props.handler(this.state.tasks[target.id])
    }
    deleteTask({target}){
        const { attributes } = target

        console.log(attributes, attributes[0].value)
        for(let key in target){
            key.includes('attr') && console.log(key, target[key])
        }
        // console.log(value)
        Axios.post('http://localhost:3002/api/delete-task', {id:attributes[0].value})
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    render(){
        return (
            <div className='task-list-container'>
                <div className='task-list-title'>TASK LIST</div>
                {this.state.tasks.length && this.state.tasks.map((e,i) => {
                    return e.subtasks.length ? (
                        <div>
                            <span value={false ? this.state.task_ids[i] : e.task} onClick={this.deleteTask} className='delete-task' >del</span>
                            <span
                                id={i}
                                className='task-list-task' 
                                onClick={this.selectTask}>
                                {e.task}
                            </span>
                            <div class='task-list-graph' id={i}>
                            {this.state[e.task] && this.state[e.task].map((val,i)=>{
                                return <div className='task-list-bar' style={{height:`${(val/(Math.max(...this.state[e.task])))*100}%`}}></div>
                            })}
                            </div>    
                        </div>
                    ) : ''
                })}
            </div>
        )
    }
}

export default SmallTimer