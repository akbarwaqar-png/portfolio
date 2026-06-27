function DerivativesData({ derivativesData }) {
  if (!derivativesData || derivativesData.length === 0) {
    return (
      <div className="empty-state">
        No derivatives data loaded yet.
      </div>
    );
  }

  const headers = Object.keys(derivativesData[0]);

  return (
    <div>
      <div className="source-data-header">
        <div>
          <h3>Derivatives</h3>
          <p>
            Read-only synthetic MAS-style OTC derivatives source data used by
            the risk model demonstrations.
          </p>
        </div>

        <span className="record-count">
          {derivativesData.length} records
        </span>
      </div>

      <div className="source-table-wrapper">
        <table className="source-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {derivativesData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DerivativesData;