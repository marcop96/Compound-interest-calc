import { useState } from "react";

function InvestmentForm({ onYearlyDataChange, onShowTableChange }) {
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
      onShowTableChange(true);
    }

    onYearlyDataChange(yearlyData);
  };
  const handleSubmit = (event) => {
    // TODO fix bug where double submit is needed if previosly inputs where invalid and then fixed
    event.preventDefault();
    validateInputs();
  };
  function emptyInputs() {
    setCurrentSavings("");
    setYearlyContribution("");
    setExpectedReturn("");
    setDuration("");
  }

  function resetStates() {
    setCurrentSavingsValid(true);
    setYearlyContributionValid(true);
    setExpectedReturnValid(true);
    setDurationValid(true);
  }
  function reset() {
    emptyInputs();
    resetStates();
    onShowTableChange(false);
  }
  function validateInputs() {
    // TODO:fix  savings.tofixed(2) is not a function when one initial investment OR yearly savings is empty
    if (currentSavings === "") {
      setCurrentSavingsValid(false);
    } else {
      setCurrentSavingsValid(true);
    }
    if (yearlyContribution === "") {
      setYearlyContributionValid(false);
    } else {
      setYearlyContributionValid(true);
    }
    if (expectedReturn === "") {
      setExpectedReturnValid(false);
    } else {
      setExpectedReturnValid(true);
    }
    if (duration === "" || duration < 1) {
      setDurationValid(false);
    } else {
      setDurationValid(true);
    }
    if (
      currentSavingsValid &&
      yearlyContributionValid &&
      expectedReturnValid &&
      durationValid
    ) {
      calculateHandler();
    }
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
        <button type="reset" className="buttonAlt" onClick={reset}>
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
