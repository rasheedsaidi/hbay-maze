import React from 'react';

class Box extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            KeyPress: this.props.KeyPress,
            mode: this.props.mode,
            x: this.props.x,
            y: this.props.y,
        }

    }
    render() {
        //let content = 
        return (
            <button id={this.props.id} key={this.props.id} x={this.props.x} y={this.props.y} mode={this.props.mode} className="box">
                {this.setContent(this.props.mode)}
            </button>
        );
    }

    movement(key, a) {

        this.props.KeyPress(key, this.props);
        
        console.log(this.state)
        let dull_pos = this.state.doll;
        let id = dull_pos.x + '_' + dull_pos.y;
        console.log(this.state.matrix[dull_pos.x][dull_pos.y], document.getElementById(id), id);
        let matrix = this.state.matrix.slice();
        let row = matrix[dull_pos.x][dull_pos.y];
        matrix[dull_pos.x][dull_pos.y].mode = 1;
        let key_id = row.key;
        let loc = document.getElementById(key_id);
        this.setState(...this.state, {matrix: matrix});
        switch(key) {
            case this.UP:
                let current_x = row.x;
                let current_y = row.y;

                let y = current_y - 1;
                this.setState(...this.state, {doll: {x: current_x, y: y}});
                matrix[dull_pos.x][dull_pos.y].mode = 2;
                this.setState(...this.state, {matrix: matrix});
                id = current_x + '_' + y;
                loc = document.getElementById(id);
                let doll = 
                loc.innerHTML = '';
            
        }
    }

    onKeyPress(event, props){ console.log(this.state, event)
		if(event.keyCode === this.LEFT || event.keyCode === this.UP || event.keyCode === this.RIGHT || event.keyCode === this.DOWN) {
			
			//this.setState(...this.state, {moves: this.state.moves + 1});

        }
        this.props.KeyPress(event.keyCode, this.state);
	}	

    moveLeft = () => {
       
    }

    moveRight = () => {
       
    }

    moveUp = () => {
        
    }

    moveDown = () => {
        
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
                return <img className="item-img doll" src={require('../images/doll.png')} />;
                break;
            default:
                return '';
                break;
        }
    }
}

export default Box;