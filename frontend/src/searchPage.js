import { Component } from 'react';
import './css/flip.css';
import './css/design.css';

export default class SearchPage extends Component
{
    /*constructor(props)
    {
        super(props);
    }*/

    //Send le https thing so it could finally work for once!
    //Proxy gateway ya ya ya
    sendRequest() {

    }

    renderText() {
        if (this.props.isForwards)
        {
            return (<div
                className={'paperBook ' + this.props.transitionClass}
                onClick={this.props.onClick} 
                style={{zIndex: this.props.zindex}}
            >
                
            </div>)
        }
        
        return (
            <div
                className={'paperBook searchPage ' + this.props.transitionClass}
                onClick={this.props.onClick} 
                style={{zIndex: this.props.zindex}}
            >
                <div class='searchTitle'>Search For Card</div>
                <div class='inputCluster'>
                    <span>Text Query</span>
                    <input type='text' placeholder='Insert Text Here!' id='namePost' />
                </div>
                <div class='inputCluster'>
                    <input type='text' placeholder="Last-Name '2-Digit-Year" id='dateTag'/>
                    <span>Tag</span>
                </div>
                <div class='inputCluster'>
                    <span>Date Posted</span>
                    <select id='datePost'>
                        <option value='08/21'>August '21</option>
                        <option value='07/21'>July '21</option>
                        <option value='06/21'>June '21</option>
                        <option value='05/21'>May '21</option>
                        <option value='04/21'>April '21</option>
                        <option value='03/21'>March '21</option>
                        <option value='02/21'>February '21</option>
                        <option value='01/21'>January '21</option>
                        <option value='12/20'>December '20</option>
                        <option value='11/20'>November '20</option>
                        <option value='10/20'>October '20</option>
                        <option value='09/20'>September '20</option>
                    </select>
                </div>
                <br /> <br />
                <button id='search'>Search Card</button>
            </div>
        );
    }

    render() {
        return this.renderText();
    }
}