import { useState } from "react";
import DerivativesData from "./DerivativesData";
import "./SourceData.css";

function SourceData({ sourceData }) {
  const [activeSource, setActiveSource] = useState("derivatives");

  const renderSourceContent = () => {
    if (activeSource === "derivatives") {
      return <DerivativesData derivativesData={sourceData.derivatives} />;
    }

    if (activeSource === "bonds") return <h3>Bonds Dataset</h3>;
    if (activeSource === "moneyMarket") return <h3>Money Market Dataset</h3>;
    if (activeSource === "sft") return <h3>Security Financing Trades Dataset</h3>;
    if (activeSource === "equity") return <h3>Equity Dataset</h3>;
    if (activeSource === "corporateLoan") return <h3>Corporate Loan Dataset</h3>;
  };

  return (
    <div className="source-data-page">
      <aside className="source-data-left">
        <h3>Source Data</h3>

        <button className={activeSource === "derivatives" ? "active" : ""} onClick={() => setActiveSource("derivatives")}>
          Derivatives
        </button>

        <button className={activeSource === "bonds" ? "active" : ""} onClick={() => setActiveSource("bonds")}>
          Bonds
        </button>

        <button className={activeSource === "moneyMarket" ? "active" : ""} onClick={() => setActiveSource("moneyMarket")}>
          Money Market
        </button>

        <button className={activeSource === "sft" ? "active" : ""} onClick={() => setActiveSource("sft")}>
          Security Financing Trades
        </button>

        <button className={activeSource === "equity" ? "active" : ""} onClick={() => setActiveSource("equity")}>
          Equity
        </button>

        <button className={activeSource === "corporateLoan" ? "active" : ""} onClick={() => setActiveSource("corporateLoan")}>
          Corporate Loan
        </button>
      </aside>

      <main className="source-data-main">
        {renderSourceContent()}
      </main>
    </div>
  );
}

export default SourceData;