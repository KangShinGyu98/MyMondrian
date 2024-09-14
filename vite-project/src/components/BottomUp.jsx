import React, { useRef, useLayoutEffect, useState } from "react";
import "../styles/MainGrid.css";
export const BottomUp = () => {
  const m = 4;
  const n = 7;
  const rowProbablity = 0.6;
  const colProbablity = 0.6;
  // const [gridItems, setGridItems] = useState(Array.from({ length: m }, (_, idx) => Array(n).fill(idx + 1)));
  const [gridItems, setGridItems] = useState([]);
  const [gridStyles, setGridStyles] = useState({
    display: "grid",
    width: "80vw",
    height: "80vh",
    gridGap: "20px",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.9)",
    backgroundColor: "white",
    resize: "both",
    overflow: "hidden",
    gridTemplateRows: `repeat(${m}, 1fr)`,
    gridTemplateColumns: `repeat(${n}, 1fr)`,
  });
  const isFirstRender = useRef(true);

  //버튼 클릭시 gridItems 가 업데이트 되면서 랜더링이 다시 되도록 보장해줌 (그냥 useEffect 쓰면 안됨)
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } // 최초 실행 방지(단 strict 모드 때문에 배포 시에만 됨)
    setGridStyles({
      ...gridStyles,
      backgroundColor: "rgba(0,0,0,0.9)", // for inner lines
    });
  }, [gridItems]);

  // onChange 핸들러를 사용해 입력값이 변경될 때 상태 업데이트
  const RNG = () => {
    return Math.random(); // 0에서 1 사이의 값
  };

  const createGrid = () => {
    const visited = Array.from({ length: m }, () => Array(n).fill(null)); // newGridArray[m][n]
    const newGridItems = [];
    console.log("what?");
    var z = 0;
    for (var i = 0; i < m; i++) {
      for (var j = 0; j < n; j++) {
        //i j 에서 시작해서 rowspan
        //col span
        // new 객체 만들어서 push
        if (visited[i][j] !== null) continue;
        const newGridItem = new GridItem(i + 1, j + 1, i + 2, j + 2);
        visited[i][j] = true;

        let col = RNG();
        let row = RNG();

        while (newGridItem.colEnd < n && col < colProbablity && !visited[i][newGridItem.colEnd - 1]) {
          newGridItem.colEnd++;
          col = RNG();
          j++;
          visited[i][j] = true;
        }
        while (newGridItem.rowEnd < m && row < rowProbablity) {
          newGridItem.rowEnd++;
          row = RNG();
          for (let k = newGridItem.colStart - 1; k < newGridItem.colEnd - 1; k++)
            visited[newGridItem.rowEnd - 2][k] = true;
        }
        console.log("i : " + i);
        console.log("j : " + j);
        console.log(z++);
        console.log(newGridItem);
        newGridItems.push(newGridItem);
      }
    }

    setGridItems(newGridItems);
  };

  function GridItem(rowStart, colStart, rowEnd, colEnd) {
    this.rowStart = rowStart;
    this.rowEnd = rowEnd;
    this.colStart = colStart;
    this.colEnd = colEnd;
  }

  return (
    <>
      <div className="grid-layout">
        <div className="main-grid" style={gridStyles}>
          {gridItems.map((item, idx) => (
            <div
              key={idx}
              className="grid-item"
              style={{
                gridRow: `${item.rowStart} / ${item.rowEnd}`,
                gridColumn: `${item.colStart} / ${item.colEnd}`,
              }}
            >
              {idx}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        {/* <label htmlFor="rows">Rows : </label>
            <input type="number" id="rows" min={"1"} value={rows} onChange={handleRowsChange} />
            <label htmlFor="columns">Columns : </label>
            <input type="number" id="columns" min={"1"} value={columns} onChange={handleColumnsChange} />
            <button onClick={() => createGrid(rows, columns)}>CreateGrid</button> */}
        <button onClick={createGrid}>Generate</button>
      </div>
    </>
  );
};
