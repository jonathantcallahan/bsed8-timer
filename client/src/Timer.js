import React, { Component } from 'react'

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentSubtask: 0,
            currentTimer: '00:00:00',
            currentTimerS: 0,
            currentPlusMinus: '00:00:00',
            currentPlusMinusS: 0
        }
        this.nextSubtask = this.nextSubtask.bind(this)
        this.countdown = this.countdown.bind(this)
        this.getTime = this.getTime.bind(this)
    }
    componentDidMount(){
        this.setState((state,props) => {
            return {...props.timerInfo}
        })

    }
    createTimers = records => {

    }
    getTime = seconds => {
        console.log(seconds)
        const h = Math.floor(seconds/3600)
        const m = Math.floor((seconds-(h*3600))/60)
        const s = seconds - (h*3600) - (m*60)
        return [h,m,s]
    }
    countdown = clear => {
        clear && clearTimeout(setTimer)
        const timeRem = this.state.currentPlusMinusS - this.state.currentTimerS;
        console.log(timeRem)

        // converting seconds to hh:mm:ss
        let current = this.getTime(this.state.currentTimerS)
        let plusMinus = this.getTime(this.state.currentPlusMinusS)

        current = `${current[0]}:${current[1]}:${current[2]}`
        plusMinus = `${plusMinus[0]}:${plusMinus[1]}:${plusMinus[2]}`
        
        this.setState((state) => {
            return { 
                currentTimerS: this.state.currentTimerS + 1,
                currentTimer: current,
                currentPlusMinusS: this.state.currentPlusMinusS - 1,
                currentPlusMinus: plusMinus
            }
        })
        const setTimer = setTimeout(this.countdown.bind(null, false), 1000)
    }
    componentDidUpdate(){
        console.log(this.state)
    }
    nextSubtask = () => {
        this.setState(state => {
            return { 
                currentSubtask: this.state.currentSubtask + 1,
                currentPlusMinusS: parseInt(this.state.records[this.state.currentSubtask + 1])
            }
        })
        // argument will clear settimeout so that the previous recursive loop stops
        this.countdown(true)
        
    }
    render(){
        return (
            <div>
                <div className='timer-container'>
                    <div className='timer-title'>{this.props.timerInfo.task}</div>
                    <div className='timer-time-container'>
                        <div className='timer-total-times-container'>
                            <div className='timer-total-times-record'>00:00:00</div>
                            <div className='timer-total-times-current green'>00:00:00</div>
                        </div>
                        <div className='timer-large-time-container'>
                            <div className='timer-large-time'>{this.state.currentTimer && this.state.currentTimer}</div>
                            <div className='timer-large-time-plus-minus'>{this.state.currentPlusMinus && this.state.currentPlusMinus}</div>
                        </div>
                        <div className='timer-subtasks-container'>
                            {
                                this.state.subtasks && this.state.subtasks.filter((e,i) => i !== 0).map((e,i) => {
                                    return (
                                        <div className='timer-subtask' key={i} id={`subtask-${i}`} record={this.state.records[i + 1]}>
                                            <div className='timer-subtask-title'>example subtask</div>
                                            <div className='timer-subtask-plus-minus'>+00:00:00</div>
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