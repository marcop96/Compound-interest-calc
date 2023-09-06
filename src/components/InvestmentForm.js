import { useState } from "react";
import React from "react";

function InvestmentForm({ onYearlyDataChange, onShowTableChange }) {
  const yearlyData = [];
  const [values, setValues] = useState({
    savings: "",
    yearlyContribution: "",
    expectedReturn: "",
    duration: "",
  });
  const calculateHandler = () => {
    // TODO FIX CALCULATIONS
    let investedCapital = +values.savings;
    for (let i = 0; i < values.duration; i++) {
      const yearlyInterest = (+values.savings * values.expectedReturn) / 100;
      let savings =
        +values.savings + +values.expectedReturn + +values.yearlyContribution;

      //TODO clean this
      let totalInterest = +values.expectedReturn + +yearlyInterest;
      investedCapital = +investedCapital + +values.expectedReturn;
      yearlyData.push({
        year: i + 1,
        savings: savings,
        yearlyInterest,
        totalInterest,
        investedCapital,
      });
      onShowTableChange(true);
    }
    console.log(yearlyData);

    onYearlyDataChange(yearlyData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    calculateHandler();
  };

  function emptyInputs() {
    setValues({
      savings: "",
      yearlyContribution: "",
      expectedReturn: "",
      duration: "",
    });
  }

  function reset() {
    emptyInputs();
    onShowTableChange(false);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Initial Investment ($)</label>
          <input
            type="number"
            id="current-savings"
            value={values.savings}
            onChange={(e) => {
              setValues({
                ...values,
                savings: +e.target.value,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={values.yearlyContribution}
            onChange={(e) => {
              setValues({
                ...values,
                yearlyContribution: +e.target.value,
              });
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
            value={values.expectedReturn}
            onChange={(e) => {
              setValues({
                ...values,
                expectedReturn: +e.target.value,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={values.duration}
            onChange={(e) => {
              setValues({
                ...values,
                duration: +e.target.value,
              });
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
