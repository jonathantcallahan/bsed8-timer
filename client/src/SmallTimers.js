import React, { Component } from 'react'
import timerApi from './scripts/timerApi'
import Axios from 'axios';

class SmallTimer extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        Axios.get('http://localhost:3002/api/get-all-tasks')
            .then(data => console.log(data))
            .catch(err => console.log(err))
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