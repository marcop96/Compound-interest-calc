import { useState } from "react";

function InvestmentForm({ onYearlyDataChange }) {
  const [currentSavings, setCurrentSavings] = useState("");
  const [yearlyContribution, setYearlycontribution] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");
  const yearlyData = []; // per-year results
  const calculateHandler = () => {
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      setCurrentSavings(yearlyInterest + yearlyContribution);
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    } // do something with yearlyData ...
    onYearlyDataChange(yearlyData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    calculateHandler();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
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
            type="number"
            id="yearly-contribution"
            value={yearlyContribution}
            onChange={(e) => {
              setYearlycontribution(+e.target.value);
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
        <button type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button" onClick={calculateHandler}>
          Calculate
        </button>
      </p>
    </form>
  );
}

export default InvestmentForm;
