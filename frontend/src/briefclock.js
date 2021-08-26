import './css/hideList.css';
import './css/brief.css';
import './css/design.css';
import Champion from './images/vbi.svg';
import Victory from './images/champions.svg';
import DUS from './images/debateus.svg';
import Grizzly from './images/bear.svg';
import BR from './images/beyondresolved.svg';
import debatetrack from './images/debatetrack.svg';
import premier from './images/premier.svg';
import silverbullet from './images/sbb.svg';
import squirrel from './images/sk.svg';
import cal from './images/westCoast.svg';
import forensic from './images/forensicFiles.svg';
import React, { Component } from 'react';

const CHAMPIONS = {name: 'Champion', icon: Champion, file: 'Champion Briefs'};
const VBI = {name: 'Victory', icon: Victory, file: 'Victory Briefs'};
const DEBATE_US = {name: 'DebateUS', icon: DUS, file: 'DebateUS'};
const GRIZZLY = {name: 'Grizzly', icon: Grizzly, file: 'Grizzly Briefs'};
const BEYOND_RESOLVED = {name: 'Beyond Resolved', icon: BR, file: 'Beyond Resolved'};
const DEBATE_TRACK = {name: 'DebateTrack', icon: debatetrack, file: 'Debate Track'};
const PREMIER = {name: 'Premier Briefs', icon: premier, file: 'Premier Debate'};
const SBB = {name: 'Silver Bullet', icon: silverbullet, file: 'Silver Bullet Briefs'};
const SQ = {name: 'Squirrel Killer', icon: squirrel, file: 'Squirrel Killer'};
const WESTCOAST = {name: 'West Coast', icon: cal, file: 'West Coast Briefs'};
const FORENSICFILES = {name: 'Forensic Files', icon: forensic, file: 'Forensic Files'};

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
            '05/21': [],
            '04/21': [CHAMPIONS, VBI],
            '03/21': [CHAMPIONS, VBI, DEBATE_US, SBB, SQ],
            '02/21': [CHAMPIONS, DEBATE_US, VBI, SBB, SQ],
            '01/21': [CHAMPIONS, VBI, DEBATE_US, SBB, PREMIER, SQ],
            '11/20': [CHAMPIONS, VBI, SBB, DEBATE_US, WESTCOAST, FORENSICFILES],
            '9/20': [CHAMPIONS, VBI, SBB, PREMIER, GRIZZLY, DEBATE_US, BEYOND_RESOLVED],
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
            briefHeight: '0px',
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
                briefWidth: `${bounds.width}px`,
                briefHeight: `${wrap.height - (bounds.top - wrap.top) - bounds.height}px`
            });

            /*console.log(wrap.height);
            console.log(bounds.top);
            console.log(bounds.height);*/
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
            var filterEl = this.has[this.state.date].filter(el => el.name == name);
            if (filterEl.length > 0)
            {
                this.setState({brief: filterEl[0].file});
    
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
        var jibberish = `/API/brief?date=${this.state.date.replace(/\//gmi, '-').replace(' ', '')}&name=${this.state.brief.replace(/ /gmi, '+')}`;
        fetch(jibberish)
            .then((res) => {
                if (!res.ok)
                {
                    console.clear();
                    alert('The file was not found. Try again.');
                }
                else
                {
                    window.open(jibberish)
                }
            });
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
                        style={{width: this.state.briefWidth, marginLeft: this.state.briefNav, maxHeight: this.state.briefHeight, overflowY: 'auto'}}
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