import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {TimelineLite} from 'gsap'

class Box extends React.Component {
    constructor (props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            mode: this.props.mode
        }
    }

    render() {
        let content = this.setContent(this.state.mode)
        return (
            
            <a href="#" onKeyDown={this.handleKeyDown} className="box" ref={dol => this.dol = dol}>
                {content}
            </a>
        );
    }

    moveLeft = () => {
        var animation = new TimelineLite()
        animation
          .to(this.dol, 1, { x: -25 })
    }

    moveRight = () => {
        var animation = new TimelineLite()
        animation
          .to(this.doll, 1, { x: 25 })
    }

    moveUp = () => {
        var animation = new TimelineLite()
        animation
          .to(this.doll, 1, { y: -25 })
    }

    moveDown = () => {
        var animation = new TimelineLite()
        animation
          .to(this.doll, 1, { y: 25 })
    }

    handleKeyDown(e) {
        const { cursor, result } = this.state;
        
        switch(e.key) {
            case 37:
                this.moveLeft();
                break;
            case 38:
                this.moveUp();
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.moveUp();
                break;
            default:
                break;
        }
    }
    

    setContent = (state) => {
        switch(state) {
            case 0:
                return '';
                break;
            case 1:
                return <img className="item-img" src={require('../images/ball.png')} />;
                break;
            case 2:
                return <img className="item-img doll" onKeyDown={this.handleKeyDown} onClick={this.moveLeft} ref={doll => this.doll = doll} src={require('../images/doll.png')} />;
                break;
            default:
                return '';
                break;
        }
    }
}

export default Box;