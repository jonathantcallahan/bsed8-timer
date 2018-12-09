import React, { Component } from 'react'

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
            pauseTimers: false
        }
        this.getTime = this.getTime.bind(this)
        this.updateTimer = this.updateTimer.bind(this)
        this.nextSubtask = this.nextSubtask.bind(this)
    }
    componentDidMount(){
        this.setState((state,props) => {
            return {...props.timerInfo, totalPlusMinusSeconds: parseInt(props.timerInfo.records[0])}
        })
    }
    getTime = seconds => {
        // convert secconds in hh:mm:ss
        const h = Math.floor(seconds/3600)
        const m = Math.floor((seconds-(h*3600))/60)
        const s = seconds - (h*3600) - (m*60)
        let digits = [String(h),String(m),String(s)]
        console.log(digits)
        console.log(digits[0].length, digits[1].length, digits[2].length)
        // make sure each number is 2 digits
        digits = digits.map(e => e.length <= 1 ? `0${e}` : e)
        
        return `${digits[0]}:${digits[1]}:${digits[2]}`
    }
    updateTimer = (loop = 0) => {
        // if loop > current seconds return
        if(loop>this.state.currentTimerSeconds+1 || this.state.pauseTimers){ return }
        
        // add 1 second to current seconds and to loop
        // calculate time and plus minus
        this.setState({  
                currentTimerSeconds:this.state.currentTimerSeconds+1,
                currentPlusMinusSeconds:this.state.currentPlusMinusSeconds-1,
                totalTimerSeconds:this.state.totalTimerSeconds+1,
                totalPlusMinusSeconds:this.state.totalPlusMinusSeconds-1,
                [`subtaskPlusMinus_${this.state.currentSubtask}`]:this.getTime(this.state.currentPlusMinusSeconds-1)

            })
        loop++
        setTimeout(this.updateTimer.bind(this,loop),1000)
        // call recursively & end when next subtask called
    }
    nextSubtask = () => {
        // update current plus minus
        if(this.state.currentSubtask >= this.state.subtasks.length-1){
            console.log('all subtasks completed')
            this.setState({pauseTimers:true})
            return
        }
        this.setState({
            currentSubtask:this.state.currentSubtask+1,
            currentTimerSeconds:0,
            currentPlusMinusSeconds:parseInt(this.state.records[this.state.currentSubtask+1])
        }, this.updateTimer(0))
        // clear current seconds
        // start timer, pass with arg 0
    }
    componentDidUpdate(){

    }
    render(){
        return (
            <div>
                <div className='timer-container'>
                    <div className='timer-title'>{this.props.timerInfo.task}</div>
                    <div className='timer-time-container'>
                        <div className='timer-total-times-container'>
                            <div className='timer-total-times-record'>{this.state.totalPlusMinusSeconds ? this.getTime(this.state.totalPlusMinusSeconds) : '00:00:00'}</div>
                            <div className='timer-total-times-current green'>{this.state.totalTimerSeconds ? this.getTime(this.state.totalTimerSeconds) : '00:00:00'}</div>
                        </div>
                        <div className='timer-large-time-container'>
                            <div className='timer-large-time'>{this.state.currentTimerSeconds > 0 ? this.getTime(this.state.currentTimerSeconds) : '00:00:00'}</div>
                            <div className='timer-large-time-plus-minus'>{this.state.currentPlusMinusSeconds > 0 ? this.getTime(this.state.currentPlusMinusSeconds) : '00:00:00'}</div>
                        </div>
                        <div className='timer-subtasks-container'>
                            {
                                this.state.subtasks && this.state.subtasks.map((e,i) => {
                                    return (
                                        <div className='timer-subtask' key={i} id={`subtask-${i}`} record={this.state.records[i + 1]}>
                                            <div className='timer-subtask-title'>{this.state.subtasks[i]}</div>
                                            <div className='timer-subtask-plus-minus'>
                                            {this.state[`subtaskPlusMinus_${i}`] ? this.state[`subtaskPlusMinus_${i}`] : '00:00:00' }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='timer-buttons-container'>
                            <div className='timer-button-pause'>pause</div>
                            <div className='timer-button-next' onClick={this.nextSubtask}>next</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer