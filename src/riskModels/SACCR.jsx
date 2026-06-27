import { useState } from "react";
import {
  saccrColumns,
  createBlankSACCRRows,
  computeSACCRExposure,
} from "../calculations/SACCREngine";
import "./SACCR.css";

function SACCR({ sourceData }) {
  const [rows, setRows] = useState(createBlankSACCRRows());

  const computeExposure = () => {
    const results = computeSACCRExposure(sourceData.derivatives);
    setRows(results);
  };

  return (
    <div className="saccr-page">
      <div className="saccr-actions">
        <button className="compute-button" onClick={computeExposure}>
          Compute Exposure
        </button>
      </div>

      <div className="saccr-table-wrapper">
        <table className="saccr-table">
          <thead>
            <tr>
              {saccrColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {saccrColumns.map((column) => (
                  <td key={column}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SACCR;