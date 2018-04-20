import React, { Component } from 'react';
import Box from './Box';
import TodoList from './TodoList';

class Board extends Component {
    constructor (props) {
        const WIDTH = 5;
        const HEIGHT = 3;
    }
    render() {
        return (
            <div className="game">
            <div className="board">
                <div className="board-row">
                    <Box mode={0} />
                    <Box mode={1} />
                    <Box />
                </div>
                <div className="board-row">
                    <Box />
                    <Box mode={2} />
                    <Box />
                </div>
                <div className="board-row">
                    <TodoList />
                </div>
            </div>
            </div>
        );
    }

    buildBoard (width, height) {
        let matrix = getArrangement(width, height);
        for(let i = 0; i < height; i++) {
            let board_row = '';
            for(let j = 0; j < width; j++) {
                board_row += <Box x={i} y={j} mode={matric[i][j]} />
            }
        }
    }

    getArrangement(width, height) {
        matrix = [];
        for(let i = 0; i < height; i++) {
            matrix[i] = [];
            for(let j = 0; j < width; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }
}

export default Board;