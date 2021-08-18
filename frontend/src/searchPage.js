import { Component } from 'react';
import React from 'react';
import Flip from './flip.js';
import './css/flip.css';
import './css/design.css';

export default class SearchPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            trackFocus: [false, false, false],
            name: '',
            tag: '',
            datePost: '',
            errorMsg: ''
        };
        this.nameHTML = React.createRef();
        this.tagHTML = React.createRef();
        this.dateHTML = React.createRef();
        this.updateDate = this.updateDate.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.validDates = [
            {value: "09/21", text: "September '21"},
            {value: "05/21", text: "May '21"},
            {value: "04/21", text: "April '21"},
            {value: "03/21", text: "March '21"},
            {value: "02/21", text: "February '21"},
            {value: "01/21", text: "January '21"},
            {value: "12/20", text: "December '20"},
            {value: "11/20", text: "November '20"},
            {value: "10/20", text: "October '20"},
            {value: "09/20", text: "September '20"}
        ];
    }

    //Send le https thing so it could finally work for once!
    //Proxy gateway ya ya ya
    //this.props.reRender
    sendRequest() {
        //Error check + Defensive Programming
        let req =  [{
            caption: 'Seaweed destroys the world',
            tag: 'Trolley \'14',
            text: 'If seaweeds ***continue*** to overpopulate society, we **could** be faced with a *rising climate crisis* due to the nutrient extraction posed by them towards the Earth'
        }];

        this.props.reRender(req);
    }

    updateName() {
        var name = this.nameHTML.current.value;
        this.setState({name: name});
    }

    updateDate() {
        var date = this.dateHTML.current.value;
        if (this.checkDate(date))
        {
            this.setState(
                {
                    datePost: date,
                    errorMsg: ''
                }
            );
            this.dateHTML.current.style.color = 'rgb(153, 153, 153)';
        }
        else
        {
            this.dateHTML.current.style.color = 'red';
            this.setState({errorMsg: 'You have an invalid date. Try again.'});
        }
    }

    updateTag() {
        var tag = this.tagHTML.current.value;
        this.setState({tag: tag});
    }

    checkDate(dateVal) {
        var filArr = this.validDates.filter(item => item.value == dateVal);
        return filArr.length > 0;
    }

    addOptions() {
        var dates = [];
        this.validDates.forEach((item, i) => {
            dates.push(<option value={item.value} key={`a${i}`}>{item.text}</option>)
        });

        return (dates);
    }

    a(i) {
        return () => {
            var arr = this.state.trackFocus.slice();
            arr[i] = true;
            this.setState({
                trackFocus: arr
            });
        }
    }

    b(i) {
        return () => {
            var arr = this.state.trackFocus.slice();
            arr[i] = false;
            this.setState({
                trackFocus: arr
            });
        }
    }

    renderText() {
        if (this.props.isForwards)
        {
            return (<div
                className={'paperBook ' + this.props.transitionClass}
                style={{zIndex: this.props.zindex}}
            >
                <Flip onClick={this.props.onClick}/>
            </div>)
        }
        
        return (
            <div
                className={'paperBook searchPage ' + this.props.transitionClass}
                style={{zIndex: this.props.zindex}}
            >
                <Flip onClick={this.props.onClick}/>
                <div className='searchTitle'>Search For Card</div>
                <div className='inputCluster'>
                    <span className={this.state.trackFocus[0] ? 'inputSpanFocus' : ''}>Query</span>
                    <input type='text' 
                        placeholder='Insert Text Here!' 
                        id='namePost' 
                        onFocus={this.a(0)} 
                        onBlur={this.b(0)} 
                        className={this.state.trackFocus[0] ? 'inputTextFocus' : ''} 
                        ref={this.nameHTML} 
                        onChange={this.updateName}
                    />
                </div>
                <div className='inputCluster'>
                    <input type='text' 
                        placeholder="Last-Name '2-Digit-Year" 
                        id='dateTag' 
                        onFocus={this.a(1)} 
                        onBlur={this.b(1)} 
                        className={this.state.trackFocus[1] ? 'inputTextFocus' : ''} 
                        ref={this.tagHTML} 
                        onChange={this.updateTag}
                    />
                    <span className={this.state.trackFocus[1] ? 'inputSpanFocus' : ''}>Tag</span>
                </div>
                <div className='inputCluster'>
                    <span className={this.state.trackFocus[2] ? 'inputSpanFocus' : ''}>Date Posted</span>
                    <select id='datePost' 
                        className={this.state.trackFocus[2] ? 'inputTextFocus' : ''} 
                        onFocus={this.a(2)} 
                        onBlur={this.b(2)} 
                        ref={this.dateHTML} 
                        onChange={this.updateDate}
                    >
                        {this.addOptions()}
                    </select>
                </div>
                <br /> <br />
                <div id='error'>
                    {this.state.errorMsg}
                </div>

                <button id='search' onClick={this.sendRequest}>Search Card</button> <br />
            </div>
        );
    }

    render() {
        return this.renderText();
    }
}