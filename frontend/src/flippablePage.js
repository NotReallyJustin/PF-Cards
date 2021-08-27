import './css/flip.css';
import './css/design.css';
import { Component } from 'react';
import Flip from './flip.js';

export default class FlippablePage extends Component
{
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
    }

    purify(text)
    {
        var toAdd = [];

        //1st time in session is true
        for (var i = 0, numStars = 0, inSession = false, trackStart = -1; i < text.length; i++)
        {
            if (text[i] == '*')
            {
                numStars++;
                if (text[i + 1] != '*')
                {
                    inSession = !inSession;

                    if (inSession)
                    {
                        toAdd.push(<span key={i}>{text.substring(trackStart + 1, i - numStars + 1)}</span>)
                        trackStart = i;
                    }
                    else
                    {
                        switch(numStars)
                        {
                            case 1:
                                toAdd.push(<u key={i}>{text.substring(trackStart + 1, i + 1 - numStars)}</u>);
                            break;

                            case 2:
                                toAdd.push(<b key={i}>{text.substring(trackStart + 1, i + 1 - numStars)}</b>);
                            break;

                            case 3:
                                toAdd.push(<b key={i}><u>{text.substring(trackStart + 1, i + 1 - numStars)}</u></b>);
                            break;
                        }
                        trackStart = i;
                    }
                    numStars = 0;
                }
            }
            else if (text[i + 1] == undefined)
            {
                toAdd.push(<span>{text.substring(trackStart + 1, i + 1)}</span>)
            }
        }

        return toAdd;
    }

    //Caption, tag, text!
    //The text allows for HTML
    renderContent() {
        if (this.props.content == '') return '';

        return (<div className='card'><br />
            <div className='noCapOnAStackFrFr'>
                {this.purify(this.props.content.caption)}
            </div>
            <div className='tag'>
                {this.purify(this.props.content.tag)}
            </div> <br />
            <div className='actualCard'>
                {this.purify(this.props.content.text)}
            </div>
        </div>)
    }

    render() {
        if (this.props.isCover)
        {
            return(
            <div className={'cover ' + this.props.transitionClass + " " + this.props.specialCover}
                style={{zIndex: this.props.zindex}}
            >

            </div>)
        }

        if (this.props.isForwards)
        {
            return (
                <div className={'paperBook ' + this.props.transitionClass}>
                    <Flip onClick={this.props.onClick}/>
                </div>
            )
        }

        return (
            <div 
                className={'paperBook ' + this.props.transitionClass + " " + this.props.specialCover} 
                style={{zIndex: this.props.zindex}}
            >
                <Flip onClick={this.props.onClick}/>
                {this.renderContent()}
            </div>
        );
    }
}