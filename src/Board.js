import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: 0.5
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.flipCellsAround = this.flipCellsAround.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  isLit() {
    return (Math.random() > this.props.chanceLightStartsOn)
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    board = Array.from({length:this.props.ncols}).map(col => Array.from({length:this.props.nrows}).map(row => this.isLit()))
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y,x);
    flipCell(y-1,x);
    flipCell(y,x-1);
    flipCell(y+1,x);
    flipCell(y,x+1);
    // win when every cell is turned off
    
    // TODO: determine is the game has been won
    let hasWon = true;
    for (let row of board) {
      for (let item of row) {
        if (item) {
          hasWon = false;
        }
      }
    }

    this.setState({board, hasWon});

  }

  renderBoardBody() {
    return this.state.board.map((col,colIndex) => {
              return <tr key={colIndex}>
                      {col.map((value,rowIndex) => {
                          return <Cell 
                                  key={`${colIndex}-${rowIndex}`} 
                                  coord={`${colIndex}-${rowIndex}`} 
                                  flipCellsAroundMe={this.flipCellsAround} 
                                  isLit={value}/>
                      })}
                    </tr>
      })
  }

  /** Render game board or winning message. */

  render() {
    
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return <h1 className="Board">YOU WON</h1>;
    }
    // TODO

    // make table board
    return (
      <table className="Board">
        <tbody>
        {
          this.renderBoardBody()
        }
        </tbody>
      </table>
      );
    // TODO
  }
}


export default Board;
