import React, { useLayoutEffect, useState } from "react";
import "../styles/MainGrid.css";
export const MainGrid = () => {
  const [rowFractions, setRowFractions] = useState("");
  const [columnFractions, setColumnFractions] = useState("");
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [gridItems, setGridItems] = useState([]);
  const [gridStyles, setGridStyles] = useState({
    display: "grid",
    width: "80vw",
    height: "80vh",
    border: "2px solid black",
    resize: "both",
    overflow: "hidden",
  });
  useLayoutEffect(() => {
    setGridStyles({
      ...gridStyles,
      gridTemplateColumns: columnFractions,
      gridTemplateRows: rowFractions,
    });
  }, [gridItems]);

  // onChange 핸들러를 사용해 입력값이 변경될 때 상태 업데이트
  const handleRowsChange = (e) => setRows(e.target.value);
  const handleColumnsChange = (e) => setColumns(e.target.value);
  const RNG = () => {
    return Math.random() * 5 + 0.5; // 0.5에서 5 사이의 값
  };
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const convertToPercentageStrings = (RandomNumberArr) => {
    const sum = RandomNumberArr.reduce((acc, val) => acc + parseFloat(val), 0);
    return RandomNumberArr.map((fraction) => `${((parseFloat(fraction) / sum) * 100).toFixed(2)}%`).join(" ");
  };

  const createGrid = (rows, columns) => {
    if (rows > 30 || columns > 30) {
      alert("Max 30, under 10 recommend");
      return false;
    }
    const newRowFractions = Array.from({ length: rows }, RNG);
    setRowFractions(convertToPercentageStrings(newRowFractions));
    const newColumnFractions = Array.from({ length: columns }, RNG);
    setColumnFractions(convertToPercentageStrings(newColumnFractions));

    const newGridItems = Array.from({ length: rows * columns }, (_, index) => index + 1);
    setGridItems(newGridItems);
  };
  const CreateRandomGrid = () => {
    const rowsNow = getRandomInt(1, 5);
    setRows(rowsNow);
    const columnsNow = getRandomInt(1, 5);
    setColumns(columnsNow);
    createGrid(rowsNow, columnsNow);
  };

  return (
    <div className="grid-layout">
      <div className="buttons">
        <label htmlFor="rows">Rows : </label>
        <input type="number" id="rows" min={"1"} value={rows} onChange={handleRowsChange} />
        <label htmlFor="columns">Columns : </label>
        <input type="number" id="columns" min={"1"} value={columns} onChange={handleColumnsChange} />
        <button onClick={() => createGrid(rows, columns)}>CreateGrid</button>
        <button onClick={CreateRandomGrid}>RandomGrid</button>
      </div>
      <div className="main-grid" style={gridStyles}>
        {gridItems.map((item) => (
          <div key={item} className="grid-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
