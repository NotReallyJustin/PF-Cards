import './css/flip.css';
import './css/design.css';
import { Component } from 'react';

export default class FlippablePage extends Component
{
    /*constructor(props) {
        super(props);
        //this.ref = React.createRef();
    }*/

    render() {
        return (
            <div 
                className={(this.props.isCover ? 'cover ' : 'paperBook ') + this.props.transitionClass + " " + this.props.specialCover} 
                onClick={this.props.onClick} 
                style={{zIndex: this.props.zindex}}
            >
                {this.props.content}
            </div>
        );
    }
}