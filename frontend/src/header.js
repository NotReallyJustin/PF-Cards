import { Component } from "react";
import LinkSet from "./linkSet";
import "./css/header.css";
import logo from "./images/logo.png";

export default class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            active: ['active', '', '']
        }
    }

    handleClick(i)
    {
        var arr = ['', '', ''];
        arr[i] = 'active';
        this.setState({active: arr});
    }

    render()
    {
        return(<header className="transparent navBar flexive">
            <img src={logo} alt='logo' className="logo"/>
            <div className='title headerSpacing'>PF Cards</div>
            <div className='rightFade flexive'>
                <LinkSet value="Search" redirect='/' onClick={() => this.handleClick(0)} act={this.state.active[0]} />
                <LinkSet value="About" redirect='/about' onClick={() => this.handleClick(1)} act={this.state.active[1]} />
                <LinkSet value="Briefs" redirect='/briefs' onClick={() => this.handleClick(2)} act={this.state.active[2]} />            
            </div>
        </header>);
    }
}