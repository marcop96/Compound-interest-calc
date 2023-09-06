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

  const [validValues, setValidValues] = useState({
    savingsValid: true,
    yearlyContributionValid: true,
    expectedReturnValid: true,
    durationValid: true,
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
    onYearlyDataChange(yearlyData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValidValues({
      savingsValid: validateInputs(values.savings),
      yearlyContributionValid: validateInputs(values.yearlyContribution),
      expectedReturnValid: validateInputs(values.expectedReturn),
      durationValid: validateInputs(values.duration),
    });

    if (
      !validValues.savingsValid ||
      !validValues.yearlyContributionValid ||
      !validValues.expectedReturnValid ||
      !validValues.durationValid
    ) {
      console.log(validValues);
      return;
    }
    calculateHandler();
  };

  function validateInputs(input) {
    return input > 0 || isNaN(input);
  }

  function emptyInputs() {
    setValues({
      savings: "",
      yearlyContribution: "",
      expectedReturn: "",
      duration: "",
    });
  }

  function reset() {
    setValidValues({
      savingsValid: true,
      yearlyContributionValid: true,
      expectedReturnValid: true,
      durationValid: true,
    });
    emptyInputs();
    onShowTableChange(false);
  }

  return (
    // TODO fix styles with class
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Initial Investment ($)</label>
          <input
            style={{ border: !validValues.savingsValid && "1px solid red" }}
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
            style={{
              border: !validValues.yearlyContributionValid && "1px solid red",
            }}
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
            style={{
              border: !validValues.expectedReturnValid && "1px solid red",
            }}
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
            style={{ border: !validValues.durationValid && "1px solid red" }}
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
