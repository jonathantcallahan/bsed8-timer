import React, { Component } from 'react'
import Axios from 'axios';

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            task: '',
            subtasks: [],
            records: [],
            currentSubtask: -1,
            currentTimerSeconds: 0,
            currentPlusMinusSeconds: 0,
            totalTimerSeconds: 0,
            totalPlusMinusSeconds: 0,
            pauseTimers: false,
            taskPosted: false,
            ctAll: 0,
            ctCounter: -1
        }
        this.getTime = this.getTime.bind(this)
        this.postTask = this.postTask.bind(this)
        this.nextButton = this.nextButton.bind(this)
        this.slimTimer = this.slimTimer.bind(this)
        this.updateSubtask = this.updateSubtask.bind(this)
    }
    componentDidMount(){
        this.props.timerInfo.task && this.setState((state,props) => {
            return {...props.timerInfo, taskRecord:parseInt(props.timerInfo.records[0]||0) ,totalPlusMinusSeconds: parseInt(props.timerInfo.records[0]) || 0}
        })
        this.props.timerInfo.subtasks.forEach((e,i)=>{
            this.setState({[`subtask_${i}`]:0,[`record_${i}`]:parseInt(this.props.timerInfo.records[i+1])||0})
        })
    }
    postTask = data => {
        Axios.post('http://localhost:3002/api/update-task-records', data)
            .then(d => console.log(d))
            .catch(e => console.log(e))
    }
    getTime = seconds => {
        // convert secconds in hh:mm:ss
        const h = Math.floor(seconds/3600)
        const m = Math.floor((seconds-(h*3600))/60)
        const s = seconds - (h*3600) - (m*60)
        let digits = [String(h),String(m),String(s)]
        // make sure each number is 2 digits
        digits = digits.map(e => e.length <= 1 ? `0${e}` : e)
        
        return `${digits[0]}:${digits[1]}:${digits[2]}`
    }
    nextButton(){
        const s = this.state.ctCounter
        if(s == -1) { return 'START' }
        else if(s >= this.state.subtasks.length -1){ return 'FINISH'}
        else { return 'NEXT' }
    }
    updateSubtask(){
        if(this.state.ctCounter == -1){ this.slimTimer(); this.slimTimer(true,true) }
        this.state.ctCounter < this.state.subtasks.length ? 
            this.setState({ctCounter:this.state.ctCounter+1}) :
            this.setState({pauseTimers:true},this.postTask())

    }
    slimTimer(t=false,start=false){
        console.log('slim timer')
        console.log(this.state)
        // stop if tasks are completed
        if(this.state.pauseTimers){ return }
        // use same function for total counter
        if(t){ this.setState({ctAll:this.state.ctAll+1},
            ()=>{setTimeout(this.slimTimer.bind(this,true),1000)}); return }
        // update the timer for the current subtask
        this.setState({[`subtask_${this.state.ctCounter}`]:this.state[`subtask_${this.state.ctCounter}`]+1},
            ()=>{setTimeout(this.slimTimer,1000)})
    }
    render(){
        return (
            <div>
                <div className='timer-container container'>
                    <div className='timer-title title bold'>{this.props.timerInfo.task}</div>
                    <div className='timer-time-container'>
                        <div className='timer-total-times-container'>
                            <div className='timer-total-times-record'>{this.getTime(this.state.ctAll - this.state.taskRecord) || '00:00:00'}</div>
                            <div className='timer-total-times-current green'>{this.getTime(this.state.ctAll) || '00:00:00'}</div>
                        </div>
                        <div className='timer-large-time-container'>
                            <span className='timer-large-time'>{this.state.ctAll ? this.getTime(this.state[`subtask_${this.state.ctCounter}`]) : '00:00:00'}</span>
                            <span className='timer-large-time-plus-minus'>{this.state.currentPlusMinusSeconds > 0 ? this.getTime(this.state.currentPlusMinusSeconds) : '00:00:00'}</span>
                        </div>
                        <div className='timer-subtasks-container'>
                            {
                                this.state.subtasks && this.state.subtasks.map((e,i)  => {
                                    return (
                                        <div className='timer-subtask' 
                                            key={i} 
                                            id={`subtask-${i}`} 
                                            record= {this.state.records.length ? this.state.records[i + 1] : 0}>
                                            <div className='timer-subtask-title'>{this.state.subtasks[i]}</div>
                                            <div className={`timer-subtask-plus-minus 
                                                ${this.state['subtask_' + this.state.ctCounter] > this.state['record_' + this.state.ctCounter] ? 'red' : 'green' }`}>
                                            {this.getTime(this.state[`subtask_${i}`] - this.state[`record_${i}`]) || '00:00:00' }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='timer-buttons-container'>
                            {!this.state.pauseTimers && <div className='button timer-button-next' onClick={this.updateSubtask}>{this.nextButton()}</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer