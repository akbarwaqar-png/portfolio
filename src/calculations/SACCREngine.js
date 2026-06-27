export const saccrColumns = [
  "ContractID",
  "Derivative Underlying",
  "Derivative Type",
  "Derivative Name",
  "Market Value",
  "Start Date [Si]",
  "End Date [Ei]",
  "Maturity [Mi]",
  "Supervisory Duration[SDi]",
  "Exercise_Date[Ti]",
  "FarLeg_Buy_Amt_inHKD",
  "FarLeg_Sell_Amt_inHKD",
  "Adjusted Notional [ di]",
  "Supervisory Option Volatility(sigma)",
  "working attribute 1",
  "working attribute 2",
  "working attribute 3",
  "Supervisory Delta Adjustment(delta)",
  "Margin Period of Risk(MPOR)",
  "Maturity Factor(MFi)",
  "Effective Notional (Di)",
  "Maturity Bucket",
  "Supervisory Factor (SFj)",
  "AddOn",
  "Replacment Cost (RC)",
  "Multiplier_Floor",
  "Multiplier",
  "Potential Future Exposure(PFE)",
  "Alpha",
  "Exposure at Default (EAD)",
];

export function createBlankSACCRRows(rowCount = 10) {
  return Array.from({ length: rowCount }, () => {
    const row = {};

    saccrColumns.forEach((column) => {
      row[column] = "";
    });

    return row;
  });
}

/*====================================================
    START DATE (Si)
====================================================*/

function parseDate(value) {
  if (!value) return null;

  const text = String(value).trim();

  // Handles YYYY-MM-DD
  if (text.includes("-")) {
    const [year, month, day] = text.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Handles DD/MM/YYYY
  if (text.includes("/")) {
    const [day, month, year] = text.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  return null;
}

function calculateStartDateSi(reportingDate, effectiveDate) {
  const report = parseDate(reportingDate);
  const effective = parseDate(effectiveDate);

  if (!report || !effective) return 0;

  if (report >= effective) return 0;

  const days = Math.floor(( effective -report ) / 86400000);

  return +(days / 365).toFixed(6);
}

/*====================================================
    End DATE (Ei)
====================================================*/

function calculateEndDateEi(reportingDate, maturityDate) {
  const report = parseDate(reportingDate);
  const maturity = parseDate(maturityDate);

  if (!report || !maturity) {
    return 0;
  }

  const days = Math.floor((maturity - report) / 86400000);

  // Reporting date is on or after maturity
  if (days <= 0) {
    return 0;
  }

  // Minimum maturity of 10 days
  if (days < 10) {
    return +(10 / 365).toFixed(6);
  }

  return +(days / 365).toFixed(6);
}

/*====================================================
    Maturity (Mi)
====================================================*/

function calculateMaturityPeriodMi(reportingDate, maturityDate) {
  const report = parseDate(reportingDate);
  const maturity = parseDate(maturityDate);

  if (!report || !maturity) {
    return 0;
  }

  const days = Math.floor((maturity - report) / 86400000);

  // Reporting date is on or after maturity
  if (days <= 0) {
    return 0;
  }

  // Minimum maturity of 10 days
  if (days < 10) {
    return +(10 / 365).toFixed(6);
  }

  return +(days / 365).toFixed(6);
}


/*====================================================
    Supervisory Duration (SDi)
====================================================*/

function calculateSupervisoryDuration(derivativeUnderlying, startDateSi, endDateEi) {

  // FX, Equity and Commodity derivatives
  if (
    derivativeUnderlying !== "Interest Rate" &&
    derivativeUnderlying !== "Credit"
  ) {
    return 1;
  }

  // Interest Rate & Credit derivatives
  const sd =
    (Math.exp(-0.05 * startDateSi) -
     Math.exp(-0.05 * endDateEi)) / 0.05;

  return +sd.toFixed(6);
}


/*====================================================
    Excercise Date (Ti)
====================================================*/

function calculateExerciseDateTi(derivativeType, reportingDate, expiryDate) {
  // For options only
  if (derivativeType !== "Option") {
    return 0;
  }

  const report = parseDate(reportingDate);
  const expiry = parseDate(expiryDate);

  if (!report || !expiry) {
    return 0;
  }

  const days = Math.floor((expiry - report) / 86400000);

  if (days <= 0) {
    return 0;
  }

  return +(days / 365).toFixed(6);
}

/*====================================================
    MAIN SA-CCR ENGINE
====================================================*/

export function computeSACCRExposure(derivativesData = []) {
  return derivativesData.map((trade) => {
    const row = {};

    saccrColumns.forEach((column) => {
      row[column] = "";
    });

    //===============================
    // Source Data Mapping
    //===============================

    row["ContractID"] = trade.uniqueContID;
    row["Derivative Underlying"] = trade.asset_class;
    row["Derivative Type"] = trade.contract_type
    row["Derivative Name"] = trade.product_name;
    row["Market Value"] = trade.valuation_amount;

    //===============================
    // Calculated Fields
    //===============================

    row["Start Date [Si]"] = calculateStartDateSi(
      trade.reporting_date,
      trade.effective_date
    );

    row["End Date [Ei]"] = calculateEndDateEi(
     trade.reporting_date,
     trade.maturity_date
    );

    row[ "Maturity [Mi]"] = calculateMaturityPeriodMi(
     trade.reporting_date,
     trade.maturity_date
    );

    row["Supervisory Duration[SDi]"] = calculateSupervisoryDuration(
    row["Derivative Underlying"],
    row["Start Date [Si]"],
    row["End Date [Ei]"]
    );

   row["Exercise_Date[Ti]"] = calculateExerciseDateTi(
  trade.contract_type,
  trade.reporting_date,
  trade.expiry_date
  );

    return row;
  });
}