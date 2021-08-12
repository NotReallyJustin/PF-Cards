 import './css/design.css';
import Paper from './paper.js';
//import { Component } from "react";

export default function NotePad()
{
    return (
        <div className='notepad'>
            <div className='padStick'></div>
            <Paper 
                editable='true' 
                content={
                    <div className='pad'><b>Tammy '19</b><br /><br /> As 
                    <span className='highlight'> social security </span>  
                    expenses increase alongside the massive COVID spending by Congress, more government branches will depend on quantitative easing - which if gone wrong, could shift economic power to the hands of China and 
                    <span className='highlight'> cause </span> an increase in 
                    <span className='highlight'> nuclear miscalculation.</span></div>
                }
            ></Paper>
        </div>
    );
}

/*export default class NotePad extends Component
{
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div class='notepad'>
                <div class='padStick'></div>
                <Paper 
                    editable='true' 
                    content={
                        <div><b>Tammy '19</b> <br /> As 
                        <span className='highlight'>social security</span> 
                        expenses increase alongside the massive COVID spending by Congress, more government branches will depend on quantitative easing - which if gone wrong, could shift economic power to the hands of China and 
                        <span className='highlight'>cause</span> an increase in 
                        <span className='highlight'>nuclear miscalculation.</span></div>
                    }
                ></Paper>
            </div>
        );
    }
}*/