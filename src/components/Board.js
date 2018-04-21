import React, { Component } from 'react';
import Box from './Box';

class Board extends Component {
    
    constructor (props) {
        super(props);
        const TEN = 10;
        this.UP = 38;
        this.DOWN = 40;
        this.LEFT = 37;
        this.RIGHT = 39;
        //let x, y, matrix, balls;
        
        this.WIDTH = parseInt(prompt("Enter board width"), 10);
        this.HEIGHT = parseInt(prompt("Enter board height"), 10);

        if (null === this.WIDTH || isNaN(this.WIDTH) || this.WIDTH < 3) 
            this.WIDTH = TEN;

        if (null === this.HEIGHT || isNaN(this.HEIGHT) || this.HEIGHT < 3) 
            this.HEIGHT = TEN;

        this.matrix = this.fillList(this.WIDTH, this.HEIGHT);
        this.state = {
            row: this.WIDTH,
            col: this.HEIGHT,
            moves: 0,
            balls: this.balls,
            doll: {x: this.x, y: this.y},
            matrix: this.matrix
        }
        
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    {this.buildBoard()}
                </div>
            </div>
        );
    }

    onKeyPress(event) { 
        let key = event.keyCode;
        if(key === this.LEFT || key === this.UP || key === this.RIGHT || key === this.DOWN) {
            let matrix = this.state.matrix.slice(); 
            let row = this.state.doll;
            matrix[row.x][row.y].mode = 0;
            let doll;
            let current_x;
            let current_y;
            let y;
            let x;
            switch(key) {
                case this.UP:
                    current_x = row.x;
                    y = row.y;
                    x = current_x - 1;
                    doll = {x: x, y: y};                    
                    break;
                case this.DOWN:
                    current_x = row.x;
                    y = row.y;
                    x = current_x + 1;
                    doll = {x: x, y: y};                    
                    break;
                case this.RIGHT:
                    current_y = row.y;
                    x = row.x;
                    y = current_y + 1;
                    doll = {x: x, y: y};                    
                    break;
                case this.LEFT:
                    current_y = row.y;
                    x = row.x;
                    y = current_y - 1;
                    doll = {x: x, y: y};                    
                    break;
                default:                    
                    break;
            }

            if(this.isValidLocation(doll)) { 
                if(matrix[doll.x][doll.y]) {
                    if(this.hasBall(doll))
                        this.setState(...this.state, {balls: this.state.balls - 1});
                    matrix[doll.x][doll.y].mode = 2;
                    this.setState({matrix: matrix});
                    this.setState({doll: doll});
                    this.setState(...this.state, {moves: this.state.moves + 1});
                    
    
                    if(this.gameIsComplete()) {
                        alert("You saved our darling princess by " + this.state.moves + " moves.");
                        window.location.reload();
                    }
                }
                
            }
        } 
    }

    gameIsComplete() {
        return this.state.balls === 0;
    }

    hasBall(loc) {
        let matrix = this.state.matrix;
        return matrix[loc.x][loc.y].mode === 1;
    } 

    isValidLocation(doll) {
        return (doll.x >= 0 && doll.x < this.HEIGHT) && (doll.y >= 0 && doll.y < this.WIDTH); 
    }

    componentWillMount() {
		document.addEventListener("keydown", this.onKeyPress);
    }    

    buildBoard() {
        let board = [];
        for(let i in this.state.matrix) {
            let board_row = [];
            let row = this.state.matrix[i];
            for(let j in row) {
                let k = i + '_' + j;
                board_row.push( <Box key={k} id={this.state.matrix[i][j].key} x={this.state.matrix[i][j].x} y={this.state.matrix[i][j].y} mode={this.state.matrix[i][j].mode} /> );
                
            }
            board.push(<div key={i} className="board-row">
                { board_row }
            </div>);
        }
        return board;
    }

    getDummyList(row, col) {
        let list = [];
        for(let i = 0; i < row * col; i++) {
            list[i] = 0;
        }
        list[Math.floor(Math.random() * list.length)] = 2;
        return list;
    }

    fillList(row, col) {
        let list = this.getDummyList(row, col);
        let fittings = Math.floor(Math.floor(row * col * .70));
        this.balls = fittings;
        let k = 0;
        while (true) {
            let i = Math.floor(Math.random() * row * col);             
            if(typeof list[i] !== 'undefined' && list[i] === 0) {
                list[i] = 1;
                k += 1;
                if(k >= fittings){
                    break;
                }               
            }
        }
        return this.reshape(list, row);
    }

    reshape(list, row) {
        let matrix = [];
        let x = 0;
        let y = 0;
        let line = [];
        for(let i = 0; i < list.length; i++) {
            let k = x + '_' + y;
            line[y] = {x: x, y: y, mode: list[i], key: k};
            if(list[i] === 2) {
                this.x = x;
                this.y = y;
            }
            y += 1;
            if (line.length === row) {
                matrix[x] = line;
                
                line = [];
                x += 1; 
                y = 0;               
            }
        }
        return matrix;
    }
}

export default Board;