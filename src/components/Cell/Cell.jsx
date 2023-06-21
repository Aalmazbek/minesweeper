import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";

import css from "./Cell.module.css";

import ic_mine from "../../assets/ic_mine.svg";


function Cell({
  value,
  revealed,
  x,
  y,
  flagged,
  neighbours,
  updateFlag,
  revealCell,
  grid,
}) {
  const [merge, setMerge] = useState({
    topLeft: false,
    top: false,
    topRight: false,
    right: false,
    bottomRight: false,
    bottom: false,
    bottomLeft: false,
    left: false,
  });

  const [corner, setCorner] = useState({
    topLeft: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
  });

  const [className, setClassName] = useState("");

  useEffect(() => {
    let mergeCopy = cloneDeep(merge);

    if (flagged) {
      //TopLeft
      if (x > 0 && y > 0 && grid[x - 1][y - 1].flagged) {
        mergeCopy = { ...mergeCopy, topLeft: true };
      } else {
        mergeCopy = { ...mergeCopy, topLeft: false };
      }

      //Top
      if (x > 0 && grid[x - 1][y].flagged) {
        mergeCopy = { ...mergeCopy, top: true };
      } else if (x > 0 && !grid[x - 1][y].flagged) {
        mergeCopy = { ...mergeCopy, top: false };
      }

      //TopRight
      if (x > 0 && y < grid[x].length - 1 && grid[x - 1][y + 1].flagged) {
        mergeCopy = { ...mergeCopy, topRight: true };
      } else {
        mergeCopy = { ...mergeCopy, topRight: false };
      }

      //Right
      if (y < grid[x].length - 1 && grid[x][y + 1].flagged) {
        mergeCopy = { ...mergeCopy, right: true };
      } else {
        mergeCopy = { ...mergeCopy, right: false };
      }

      //BottomRight
      if (x < grid.length - 1 && y < grid[x].length - 1 && grid[x + 1][y + 1].flagged) {
        mergeCopy = { ...mergeCopy, bottomRight: true };
      } else {
        mergeCopy = { ...mergeCopy, bottomRight: false };
      }

      //Bottom
      if (x < grid[x].length - 1 && grid[x + 1][y].flagged) {
        mergeCopy = { ...mergeCopy, bottom: true };
      } else {
        mergeCopy = { ...mergeCopy, bottom: false };
      }

      //BottomLeft
      if (x < grid.length - 1 && y > 0 && grid[x + 1][y - 1].flagged) {
        mergeCopy = { ...mergeCopy, bottomLeft: true };
      } else {
        mergeCopy = { ...mergeCopy, bottomLeft: false };
      }

      //Left
      if (y > 0 && grid[x][y - 1].flagged) {
        mergeCopy = { ...mergeCopy, left: true };
      } else {
        mergeCopy = { ...mergeCopy, left: false };
      }

      if (!mergeCopy.topLeft && mergeCopy.top && mergeCopy.left) {
        setCorner((elem) => ({ ...elem, topLeft: true }));
      } else {
        setCorner((elem) => ({ ...elem, topLeft: false }));
      }
      if (!mergeCopy.topRight && mergeCopy.top && mergeCopy.right) {
        setCorner((elem) => ({ ...elem, topRight: true }));
      } else {
        setCorner((elem) => ({ ...elem, topRight: false }));
      }
      if (!mergeCopy.bottomRight && mergeCopy.bottom && mergeCopy.right) {
        setCorner((elem) => ({ ...elem, bottomRight: true }));
      } else {
        setCorner((elem) => ({ ...elem, bottomRight: false }));
      }
      if (!mergeCopy.bottomLeft && mergeCopy.bottom && mergeCopy.left) {
        setCorner((elem) => ({ ...elem, bottomLeft: true }));
      } else {
        setCorner((elem) => ({ ...elem, bottomLeft: false }));
      }
    } else if (!flagged) {
      //TopLeft
      if (
        x > 0 &&
        y > 0 &&
        grid[x - 1][y - 1].revealed === false &&
        !grid[x - 1][y - 1].flagged
      ) {
        mergeCopy = { ...mergeCopy, topLeft: true };
      } else {
        mergeCopy = { ...mergeCopy, topLeft: false };
      }

      //Top
      if (
        x > 0 &&
        grid[x - 1][y].revealed === false &&
        !grid[x - 1][y].flagged
      ) {
        mergeCopy = { ...mergeCopy, top: true };
      } else {
        mergeCopy = { ...mergeCopy, top: false };
      }

      //TopRight
      if (
        x > 0 &&
        y < grid[x].length - 1 &&
        grid[x - 1][y + 1].revealed === false &&
        !grid[x - 1][y + 1].flagged
      ) {
        mergeCopy = { ...mergeCopy, topRight: true };
      } else {
        mergeCopy = { ...mergeCopy, topRight: false };
      }

      //Right
      if (
        y < grid[x].length - 1 &&
        grid[x][y + 1].revealed === false &&
        !grid[x][y + 1].flagged
      ) {
        mergeCopy = { ...mergeCopy, right: true };
      } else {
        mergeCopy = { ...mergeCopy, right: false };
      }

      //BottomRight
      if (
        x < grid.length - 1 &&
        y < grid[x].length - 1 &&
        grid[x + 1][y + 1].revealed === false &&
        !grid[x + 1][y + 1].flagged
      ) {
        mergeCopy = { ...mergeCopy, bottomRight: true };
      } else {
        mergeCopy = { ...mergeCopy, bottomRight: false };
      }

      //Bottom
      if (
        x < grid[x].length - 1 &&
        grid[x + 1][y].revealed === false &&
        !grid[x + 1][y].flagged
      ) {
        mergeCopy = { ...mergeCopy, bottom: true };
      } else {
        mergeCopy = { ...mergeCopy, bottom: false };
      }

      //BottomLeft
      if (
        x < grid.length - 1 &&
        y > 0 &&
        grid[x + 1][y - 1].revealed === false &&
        !grid[x + 1][y - 1].flagged
      ) {
        mergeCopy = { ...mergeCopy, bottomLeft: true };
      } else {
        mergeCopy = { ...mergeCopy, bottomLeft: false };
      }

      //Left
      if (
        y > 0 &&
        grid[x][y - 1]?.revealed === false &&
        !grid[x][y - 1].flagged
      ) {
        mergeCopy = { ...mergeCopy, left: true };
      } else {
        mergeCopy = { ...mergeCopy, left: false };
      }

      if (!mergeCopy.topLeft && mergeCopy.top && mergeCopy.left) {
        setCorner((elem) => ({ ...elem, topLeft: true }));
      } else {
        setCorner((elem) => ({ ...elem, topLeft: false }));
      }
      if (!mergeCopy.topRight && mergeCopy.top && mergeCopy.right) {
        setCorner((elem) => ({ ...elem, topRight: true }));
      } else {
        setCorner((elem) => ({ ...elem, topRight: false }));
      }
      if (!mergeCopy.bottomRight && mergeCopy.bottom && mergeCopy.right) {
        setCorner((elem) => ({ ...elem, bottomRight: true }));
      } else {
        setCorner((elem) => ({ ...elem, bottomRight: false }));
      }
      if (!mergeCopy.bottomLeft && mergeCopy.bottom && mergeCopy.left) {
        setCorner((elem) => ({ ...elem, bottomLeft: true }));
      } else {
        setCorner((elem) => ({ ...elem, bottomLeft: false }));
      }
    }
    setMerge(mergeCopy);
  }, [grid]);

  useEffect(() => {
    if (merge.top && merge.right && merge.bottom && merge.left) {
      setClassName("full-merge");
    }

    if (merge.top && merge.right && merge.bottom && !merge.left) {
      setClassName("merge-trb");
    }
    if (merge.top && merge.right && !merge.bottom && merge.left) {
      setClassName("merge-trl");
    }
    if (merge.top && !merge.right && merge.bottom && merge.left) {
      setClassName("merge-tbl");
    }
    if (!merge.top && merge.right && merge.bottom && merge.left) {
      setClassName("merge-rbl");
    }

    if (merge.top && merge.right && !merge.bottom && !merge.left) {
      setClassName("merge-tr");
    }
    if (merge.top && !merge.right && !merge.bottom && merge.left) {
      setClassName("merge-tl");
    }
    if (!merge.top && !merge.right && merge.bottom && merge.left) {
      setClassName("merge-bl");
    }
    if (!merge.top && merge.right && merge.bottom && !merge.left) {
      setClassName("merge-br");
    }
    if (merge.top && !merge.right && merge.bottom && !merge.left) {
      setClassName("merge-tb");
    }
    if (!merge.top && merge.right && !merge.bottom && merge.left) {
      setClassName("merge-rl");
    }

    if (merge.top && !merge.right && !merge.bottom && !merge.left) {
      setClassName("merge-top");
    }
    if (!merge.top && merge.right && !merge.bottom && !merge.left) {
      setClassName("merge-right");
    }
    if (!merge.top && !merge.right && merge.bottom && !merge.left) {
      setClassName("merge-bottom");
    }
    if (!merge.top && !merge.right && !merge.bottom && merge.left) {
      setClassName("merge-left");
    }

    if (!merge.top && !merge.right && !merge.bottom && !merge.left) {
      setClassName("");
    }
  }, [merge]);

  return (
    <div
      className={`
        ${css["Cell"]} ${flagged && css["flagged"]} 
        ${revealed ? value === 'X' ? css['bomb'] : css["revealed"] : ''}
        ${css[className]}
        ${corner.topLeft ? css["merge-corner-tl"] : ""}
        ${corner.topRight ? css["merge-corner-tr"] : ""}
        ${corner.bottomRight ? css["merge-corner-br"] : ""}
        ${corner.bottomLeft ? css["merge-corner-bl"] : ""}
        w-10 h-10 flex items-center justify-center relative`}
      onClick={() => revealCell(x, y)}
      onContextMenu={(e) => updateFlag(e, x, y)}
    >
      {value ? value === 'X' ? (
        <img src={ic_mine} alt="mine" />
      ) : value : ''}
      <div className={css["borderTop"]}></div>
      <div className={css["borderRight"]}></div>
      <div className={css["borderBottom"]}></div>
      <div className={css["borderLeft"]}></div>

      <span className={css["cornerTL"]}></span>
      <span className={css["cornerTR"]}></span>
      <span className={css["cornerBR"]}></span>
      <span className={css["cornerBL"]}></span>
    </div>
  );
}

export default Cell;
