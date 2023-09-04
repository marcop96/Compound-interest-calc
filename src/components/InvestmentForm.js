import { useState } from "react";

function InvestmentForm({ onYearlyDataChange }) {
  const [currentSavings, setCurrentSavings] = useState("");
  const [yearlyContribution, setYearlyContribution] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");
  const yearlyData = []; // per-year results
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
    console.log(yearlyData);
    onYearlyDataChange(yearlyData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //clear the inputs
    setCurrentSavings("");
    setYearlyContribution("");
    setExpectedReturn("");
    setDuration("");
    calculateHandler();
  };
  function hideResults(event) {
    setCurrentSavings("");
    setYearlyContribution("");
    setExpectedReturn("");
    setDuration("");
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Initial Investment ($)</label>
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
        <button type="reset" className="buttonAlt" onClick={hideResults}>
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
