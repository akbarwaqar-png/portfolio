import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SourceData from "../sourceData/SourceData";
import SACCR from "../riskModels/SACCR";
import { loadSourceData } from "../dataStore/loadSourceData";
import "./RiskModels.css";

function RiskModels() {
  const [activeMenu, setActiveMenu] = useState("sourceData");

  const [sourceData, setSourceData] = useState({
    derivatives: [],
    bonds: [],
    moneyMarket: [],
    sft: [],
    equity: [],
    corporateLoan: [],
    counterparties: [],
    marketData: [],
    yieldCurves: [],
    creditSpreads: [],
  });

  useEffect(() => {
    loadSourceData()
      .then((data) => setSourceData(data))
      .catch((error) => console.error("Source data loading failed:", error));
  }, []);

  const renderContent = () => {
    if (activeMenu === "sourceData") {
      return <SourceData sourceData={sourceData} />;
    }

    if (activeMenu === "saccr") {
      return <SACCR sourceData={sourceData} />;
    }

    if (activeMenu === "cva") return <h3>CVA</h3>;
    if (activeMenu === "frtb") return <h3>FRTB</h3>;
    if (activeMenu === "ecl") return <h3>ECL</h3>;
    if (activeMenu === "liquidityRisk") return <h3>Liquidity Risk</h3>;
  };

  return (
    <div className="risk-app">
      <nav className="risk-header">
        <h2>Risk Models Built by Akbar</h2>
        <Link to="/">Back to Portfolio</Link>
      </nav>

      <div className="model-navbar">
        <div className="navbar-left">
          <button
            className={activeMenu === "sourceData" ? "active" : ""}
            onClick={() => setActiveMenu("sourceData")}
          >
            Source Data
          </button>
        </div>

        <div className="navbar-center">
          <button
            className={activeMenu === "saccr" ? "active" : ""}
            onClick={() => setActiveMenu("saccr")}
          >
            SA-CCR
          </button>

          <button
            className={activeMenu === "cva" ? "active" : ""}
            onClick={() => setActiveMenu("cva")}
          >
            CVA
          </button>

          <button
            className={activeMenu === "frtb" ? "active" : ""}
            onClick={() => setActiveMenu("frtb")}
          >
            FRTB
          </button>

          <button
            className={activeMenu === "ecl" ? "active" : ""}
            onClick={() => setActiveMenu("ecl")}
          >
            ECL
          </button>

          <button
            className={activeMenu === "liquidityRisk" ? "active" : ""}
            onClick={() => setActiveMenu("liquidityRisk")}
          >
            Liquidity Risk
          </button>
        </div>
      </div>

      <main className="risk-content">{renderContent()}</main>
    </div>
  );
}

export default RiskModels;