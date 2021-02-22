import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
        return (
            <button className='square'
                    onClick={props.onClick}>
                {props.value}
            </button>
        )
    }

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            history_of_coordinates: [{
                coordinates: Array(2).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const history_of_coordinates = this.state.history_of_coordinates.slice(0, this.state.stepNumber + 1);
        const current_coordinates = Array(2).fill(null);
        // eslint-disable-next-line default-case
        switch(i) {
            case 0:
                current_coordinates[0] = 1
                current_coordinates[1] = 1
                break
            case 1:
                current_coordinates[0] = 1
                current_coordinates[1] = 2
                break
            case 2:
                current_coordinates[0] = 1
                current_coordinates[1] = 3
                break
            case 3:
                current_coordinates[0] = 2
                current_coordinates[1] = 1
                break
            case 4:
                current_coordinates[0] = 2
                current_coordinates[1] = 2
                break
            case 5:
                current_coordinates[0] = 2
                current_coordinates[1] = 3
                break
            case 6:
                current_coordinates[0] = 3
                current_coordinates[1] = 1
                break
            case 7:
                current_coordinates[0] = 3
                current_coordinates[1] = 2
                break
            case 8:
                current_coordinates[0] = 3
                current_coordinates[1] = 3
                break
        }


        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            history_of_coordinates: history_of_coordinates.concat([{
                coordinates: current_coordinates,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);


        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

        const history_of_coordinates = this.state.history_of_coordinates.slice();
        const current_coordinates = history_of_coordinates[move];
        const coords = current_coordinates.coordinates.slice()
        let coordsToPrint = null;
        if (coords[0]) {
            coordsToPrint =
                '[' + coords[0] + ', ' + coords[1] + ']';
        }
        if (this.state.stepNumber === move) {
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}><b>{desc} {coordsToPrint}</b></button>
                </li>
            );
        } else {
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc} {coordsToPrint} </button>
                </li>
            );
        }

        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }   else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i <lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
