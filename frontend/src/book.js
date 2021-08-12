import React, { Component } from 'react';
import './css/flip.css';
import './css/design.css';
import FlippablePage from './flippablePage.js';
import SearchPage from './searchPage.js';

export default class Book extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pageFlipped : [true, false, false, false],
            transitionHeaders : ['flipForward','','', ''],
        };
    }

    //Gets rid of all existing states, and rerenders them back in
    //Posts is an array of posts that we can use to later render, but it's strings for no
    reRender(posts) {
        var idx = 0;
        var zidx = posts.length + 2;

        this.render = () => (
            <div class='mintedBook'>
                {this.renderPage(0, '', true, zidx--)}
                {this.renderPage(++idx, '', false, zidx--)}
                {posts.map((item) => (
                    this.renderPage(++idx , item, false, zidx--)
                ))}
                {this.renderPage(++idx, '', true, zidx--)}
            </div>
        );

        this.render();
                
        var arr = [true];
        for (var i=0; i < idx; i++)
        {
            arr.push(false);
        }

        var eArr = ['flipForward'];
        for (var i=0; i < idx; i++)
        {
            eArr.push('');
        }

        this.setState({
            pageFlipped: arr,
            transitionHeaders: eArr
        });
    }

    //Make sure to render state when calling this function
    //zidx should reflect z-index from posts, in reverse order
    renderPage(i, content, isCover, zidx) {

        var renderCover = isCover || i == 0 || false;
        var clicko = () => this.flipPage(i, !this.state.pageFlipped[i]);
        if (i == 0 || renderCover) //Undefined will return false
        {
            clicko = () => {};
        }
        else if (i == 1)
        {
            return <SearchPage 
                onClick={clicko} 
                reRender={this.reRender} 
                transitionClass={this.state.transitionHeaders[i]} 
                isForwards={this.state.transitionHeaders[i] == 'flipForwardPage'}
                zindex={this.state.transitionHeaders[i] == 'flipForwardPage' ? 0 : zidx}
            />;
        }

        return (<FlippablePage 
            isCover={renderCover}
            onClick={clicko} 
            content={this.state.transitionHeaders[i] == 'flipForwardPage' ? '' : content} 
            transitionClass={this.state.transitionHeaders[i]}  
            zindex={this.state.transitionHeaders[i] == 'flipForwardPage' ? 0 : zidx}
            specialCover={i == 0 ? 'specialCover' : ''}
        />);
    }

    //Ref is a react component reference
    flipPage(i, flipForward) {
        if (i == 0 || i == this.state.pageFlipped.length - 1) return; //First and last items are covers

        var toAdd = "";

        if (flipForward)
        {
            toAdd = 'flipForwardPage';
        }
        else
        {
            toAdd = 'flipBack';
        }

        console.log(toAdd);

        var forwardArr = this.state.pageFlipped.slice();
        forwardArr[i] = flipForward;
        this.setState({pageFlipped: forwardArr})

        var arr = this.state.transitionHeaders.slice();
        arr[i] = toAdd;
        this.setState({transitionHeaders: arr});
    }

    render() {
        return (
            <div className='mintedBook'> 
                {this.renderPage(0, '', true, 3)}
                {this.renderPage(1, '', false, 2)}
                {this.renderPage(2, '', false, 1)}
                {this.renderPage(3, '', true, 0)}
            </div>
        );
    }
}