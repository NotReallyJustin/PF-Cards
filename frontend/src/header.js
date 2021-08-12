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
            currentLS: 0,
            links: ['', null, null, null, null]
        }
    }

    handleClick(i)
    {
        //window.open(`http://localhost:3000/${this.state.links[i]}`)
    }

    render()
    {
        return(<header className="transparent navBar flexive">
            <img src={logo} alt='logo' className="logo"/>
            <div className='title headerSpacing'>PF Cards</div>
            <div className='rightFade flexive'>
                <LinkSet onClick={() => this.handleClick(0)} value="Search"/>
                <LinkSet onClick={() => this.handleClick(1)} value="About"/>
                <LinkSet onClick={() => this.handleClick(2)} value="Contact"/>
                <LinkSet onClick={() => this.handleClick(3)} value="Briefs"/>
                <LinkSet onClick={() => this.handleClick(4)} value="Extras" />
            </div>
        </header>);
    }
}