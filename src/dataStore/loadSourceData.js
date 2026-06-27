import Papa from "papaparse";

const sourceFiles = {
  derivatives: "/Data/derivatives_500.csv",
  bonds: null,
  moneyMarket: null,
  sft: null,
  equity: null,
  corporateLoan: null,
  counterparties: null,
  marketData: null,
  yieldCurves: null,
  creditSpreads: null,
};

function loadCsv(filePath) {
  return fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load file: ${filePath}`);
      }
      return response.text();
    })
    .then((csvText) => {
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => resolve(result.data),
          error: (error) => reject(error),
        });
      });
    });
}

export async function loadSourceData() {
  const loadedData = {};

  for (const [key, filePath] of Object.entries(sourceFiles)) {
    if (filePath) {
      loadedData[key] = await loadCsv(filePath);
    } else {
      loadedData[key] = [];
    }
  }

  return loadedData;
}