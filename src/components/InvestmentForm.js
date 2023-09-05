import { useState } from "react";

function InvestmentForm({ onYearlyDataChange }) {
  const [currentSavings, setCurrentSavings] = useState("");
  const [currentSavingsValid, setCurrentSavingsValid] = useState(true);
  const [yearlyContribution, setYearlyContribution] = useState("");
  const [yearlyContributionValid, setYearlyContributionValid] = useState(true);
  const [expectedReturn, setExpectedReturn] = useState("");
  const [expectedReturnValid, setExpectedReturnValid] = useState(true);
  const [duration, setDuration] = useState("");
  const [durationValid, setDurationValid] = useState(true);
  const yearlyData = [];

  const calculateHandler = () => {
    let savings = currentSavings;
    let totalInterest = 0;
    let investedCapital = savings;
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = (savings * expectedReturn) / 100;
      savings = savings + yearlyInterest + yearlyContribution;
      totalInterest = totalInterest + yearlyInterest;
      investedCapital = investedCapital + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        totalInterest: totalInterest.toFixed(2),
        savings: savings.toFixed(2),
        yearlyInterest: yearlyInterest.toFixed(2),
        savingsEndOfYear: currentSavings.toFixed(2),
        investedCapital: investedCapital.toFixed(2),
      });
    }
    onYearlyDataChange(yearlyData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    validateInputs();
  };
  function hideResults(event) {
    setCurrentSavings("");
    setYearlyContribution("");
    setExpectedReturn("");
    setDuration("");
  }
  function validateInputs() {
    if (currentSavings === "") {
      setCurrentSavingsValid(false);
      return;
    } else {
      setCurrentSavingsValid(true);
    }
    if (yearlyContribution === "") {
      setYearlyContributionValid(false);
      return;
    } else {
      setYearlyContributionValid(true);
    }
    if (expectedReturn === "") {
      setExpectedReturnValid(false);
      return;
    } else {
      setExpectedReturnValid(true);
    }
    if (duration === "") {
      setDurationValid(false);
      return;
    } else {
      setDurationValid(true);
    }

    calculateHandler();
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Initial Investment ($)</label>
          <input
            style={{ border: currentSavingsValid ? "" : "1px solid red" }}
            type="number"
            id="current-savings"
            value={currentSavings}
            onChange={(e) => {
              setCurrentSavings(+e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            style={{ border: yearlyContributionValid ? "" : "1px solid red" }}
            type="number"
            id="yearly-contribution"
            value={yearlyContribution}
            onChange={(e) => {
              setYearlyContribution(+e.target.value);
            }}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            style={{ border: expectedReturnValid ? "" : "1px solid red" }}
            type="number"
            id="expected-return"
            value={expectedReturn}
            onChange={(e) => {
              setExpectedReturn(+e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            style={{ border: durationValid ? "" : "1px solid red" }}
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => {
              setDuration(+e.target.value);
            }}
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={hideResults}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
}
export default InvestmentForm;
