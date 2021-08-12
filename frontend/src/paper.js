import { Component } from "react";
import './css/design.css';

export default class Paper extends Component
{
    render()
    {
        return (
            <div 
                className={this.props.className || "paperAlone lines txt"} 
                contentEditable={this.props.editable} 
                spellCheck={"false"}>
                {this.props.content || "Write on me!"}
            </div>
        );
    }
}