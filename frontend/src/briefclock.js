import './css/hideList.css';
import './css/brief.css';
import './css/design.css';
import Champion from './images/vbi.svg';
import Victory from './images/champions.svg';
import React, { Component } from 'react';

const CHAMPIONS = {name: 'Champions', icon: Champion};
const VBI = {name: 'Victory', icon: Victory};
export default class BriefClock extends Component
{
    constructor(props)
    {
        super(props);

        this.a = this.a.bind(this);
        this.b = this.b.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateBrief = this.updateBrief.bind(this);
        this.downloadBrief = this.downloadBrief.bind(this);
        this.has = {
            '09/21': [CHAMPIONS, VBI],
            '05/21': [CHAMPIONS, VBI],
            '04/21': [CHAMPIONS],
            '03/21': [],
            '02/21': [],
            '01/21': [],
            '12/20': [],
            '11/20': [],
            '10/20': [],
            '9/20': [],
        }

        this.dateRef = React.createRef();
        this.briefRef = React.createRef();
        this.wrapRef = React.createRef();

        this.state = {
            p1: true,
            date: '09/21',
            brief: '',
            briefInvis: true,
            briefNav: '0px',
            briefWidth: '0px',
            btnActive: false,
            trackFocus: [false, false]
        }
    }

    renderLabel() {
        var arr = [];

        Object.keys(this.has).forEach((el, i) => {
            arr.push(<option key={'d' + i} value={el} className='selectOpt'>
                { el }
            </option>);
        });

        return arr;
    }

    a(i) {
        var arr = this.state.trackFocus.slice();
        arr[i] = true;

        this.setState({trackFocus: arr});

        if (i == 1)
        {
            var bounds = this.briefRef.current.getBoundingClientRect();
            var wrap = this.wrapRef.current.getBoundingClientRect();
            this.setState({
                briefInvis: false,
                briefNav: `${bounds.left - wrap.left}px`,
                briefWidth: `${bounds.width}px`
            });
        }
    }

    b(i) {
        var arr = this.state.trackFocus.slice();
        arr[i] = false;

        this.setState({trackFocus: arr});

        if (i == 1)
        {
            this.setState({briefInvis: true});
        }
    }

    updateDate() {
        if (this.has[this.dateRef.current.value] == undefined)
        {
            alert("Invalid date; Seems like you tampered with the HTML");
            this.setState({date: "09/21"});
            this.dateRef.current.value = "09/21";
        }
        else
        {
            this.setState({date: this.dateRef.current.value});
            this.date = this.dateRef.value;
        }

        this.briefRef.current.value = '';
        this.setState({btnActive: false, brief: ''});
    }

    updateBrief(name) {
        return () => {
            if (this.has[this.state.date].filter(el => el.name == name).length > 0)
            {
                this.setState({brief: name});
    
                if (name != '')
                {
                    this.setState({btnActive: true});
                }
                else
                {
                    this.setState({btnActive: false});
                }
            }
            else
            {
                alert('Invalid Brief Name; Seems like you tampered with the HTML');
                this.setState({brief: ''});
            }
        }
    }

    downloadBrief() {
        console.log(this.state.date + ' ' + this.state.brief)
        console.log('yes');
    }

    renderBrief() {
        var arr = [];

        this.has[this.state.date].forEach((brief, i) => {
            arr.push(<div
                className='briefOption' 
                onMouseDown={this.updateBrief(brief.name)}
                key={'z' + i}
            >
                <img src={brief.icon} className='selImg'/>{brief.name}
            </div>);
        });

        return arr;
    }

    //Main 
    render() {
        return(
            <div id='wrapper'>
                <div className='briefClock' ref={this.wrapRef}>
                    <div className='btxt'>Search For a Brief</div> <br /> 
                    <div className='inputCluster'>
                        <span className={this.state.trackFocus[0] ? 'inputSpanFocus' : ''}>Month</span>
                        <select id='datePost' 
                            className={this.state.trackFocus[0] ? 'inputTextFocus' : ''} 
                            onFocus={() => this.a(0)} 
                            onBlur={() => this.b(0)} 
                            ref={this.dateRef} 
                            onChange={this.updateDate}
                        >
                            {this.renderLabel()}
                        </select>
                    </div>
                    <div className='inputCluster'>
                        <span className={this.state.trackFocus[1] ? 'inputSpanFocus' : ''}>Brief Name</span>
                        <input
                            className={'selectPut ' + (this.state.trackFocus[1] ? 'inputTextFocus' : '')}
                            onFocus={() => this.a(1)} 
                            onBlur={() => this.b(1)}
                            ref={this.briefRef}
                            placeholder={this.state.brief}
                            readOnly
                        >
                        </input>
                    </div>
                    <div 
                        className={'briefSelect ' + (this.state.briefInvis ? 'invis' : '')}
                        style={{width: this.state.briefWidth, marginLeft: this.state.briefNav}}
                    >
                        {this.renderBrief()}
                    </div>
                    <div className='btnSelect'>
                        <button 
                            className={this.state.btnActive ? 'btnEnabled' : ''}
                            onClick={this.downloadBrief} 
                            disabled={!this.state.btnActive}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}