import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";

import css from "./Game.module.css";

import ic_mine from "../../assets/ic_mine.svg";
import createBoard from "../../utils/createBoard";
import Cell from "../Cell/Cell";
import {firstMoveClear} from "../../utils/firstMoveClear";

function Game() {
  const rows = 15;
  const cols = 15;
  const mines = Math.floor(rows*cols/4)

  const [isFirstMove, setIsFirstMove] = useState(true);
  const [grid, setGrid] = useState([]);
  const [lose, setLose] = useState(false);
  const [flagged, setFlagged] = useState(0);
  const [totalMines, setTotalMines] = useState(mines);
  const [saveCells, setSaveCells] = useState(rows * cols - mines);

  function freshBoard() {
    const newBoard = createBoard(rows, cols, mines);
    setGrid(newBoard.board);
    console.log(newBoard);
  }

  useEffect(() => {
    freshBoard();
  }, []);

  useEffect(() => {
    setFlagged(0);
  }, [lose]);

  useEffect(() => {
    setSaveCells((sum) => {
      let cells = 0;
      grid.forEach((row) => {
        row.forEach((cell) => {
          if (cell.revealed) {
            cells++;
          }
        });
      });
      return rows * cols - totalMines - cells;
    });
  }, [grid]);

  useEffect(() => {
    if (saveCells < 1) {
      if (window.confirm('YOU WON')) {
        freshBoard()
        setIsFirstMove(true)
        setFlagged(0)
      }
    }
  }, [saveCells]);

  const updateFlag = (e, x, y) => {
    e.preventDefault();

    let newGrid = JSON.parse(JSON.stringify(grid));

    if (!newGrid[x][y].revealed) {
      newGrid[x][y].flagged = !newGrid[x][y].flagged;
      if (newGrid[x][y].flagged) {
        setFlagged(flagged + 1);
      } else {
        setFlagged(flagged - 1);
      }
    }

    setGrid(newGrid);
  };

  const revealCell = (x, y) => {
    let newGrid = cloneDeep(grid);
    let cell = newGrid[x][y];

    if (cell.flagged) {
      return;
    }

    if (isFirstMove) {
      const first = firstMoveClear(x, y, cloneDeep(newGrid))
      newGrid = first.arr
      setTotalMines(first.minesCount)
      setIsFirstMove(false)
      cell = newGrid[x][y];
    }

    if (!cell.revealed) {
      if (cell.value === "X") {
        cell.revealed = true;
        setGrid(newGrid)
        setLose(true)

        setTimeout(() => {
          if (window.confirm("game over")) {
            freshBoard();
            setLose(false);
            setIsFirstMove(true)
          }
        }, 500);
      } else {
        cell.revealed = true;

        if (!cell.value) {
          setTimeout(() => {
            revealNeighbours(x, y);
          }, 40);
        }

        if (!saveCells) {
          alert("you won");
        }

        setGrid(newGrid);
      }
    }
  };

  const revealNeighbours = (x, y, arr) => {
    setGrid((grid) => {
      let newGrid = cloneDeep(grid);
      const cell = newGrid[x][y];
      cell.revealed = true;

      cell.neighbours.forEach((elem) => {
        const neighbour = newGrid[elem.x][elem.y];

        if (neighbour.revealed || neighbour.flagged) {
          return;
        }

        neighbour.revealed = true;

        if (!neighbour.value) {
          setTimeout(() => {
            revealNeighbours(elem.x, elem.y);
          }, 40);
        }
      });
      return newGrid;
    });
  };

  return (
    <article className="py-5 flex flex-col items-center">
      <h1 className="mb-10 flex items-center gap-2 text-2xl">
        <img src={ic_mine} alt="mine-icon.svg" className="w-10" />
        {!isFirstMove ? totalMines - flagged : ''}
      </h1>

      <div
        className={`${css["board"]} ${lose && css["board_lose"]} flex flex-col`}
      >
        {grid?.map((singleRow, index) => {
          return (
            <div key={index} className="flex">
              {singleRow.map((singleBlock, index) => (
                <Cell
                  key={index}
                  {...singleBlock}
                  updateFlag={updateFlag}
                  revealCell={revealCell}
                  grid={grid}
                />
              ))}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default Game;
