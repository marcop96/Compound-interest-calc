import { useState } from "react";
import React from "react";

function InvestmentForm({ onYearlyDataChange, onShowTableChange }) {
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
    const yearlyData = [];
    let investedCapital = parseFloat(values.savings);

    for (let i = 0; i < values.duration; i++) {
      // Calculate yearly interest based on the current invested capital
      const yearlyInterest =
        (investedCapital * parseFloat(values.expectedReturn)) / 100;

      // Calculate the new invested capital, including contributions and interest
      investedCapital = parseFloat(
        (
          investedCapital +
          yearlyInterest +
          parseFloat(values.yearlyContribution)
        ).toFixed(2)
      );

      yearlyData.push({
        year: i + 1,
        savings: investedCapital.toFixed(2),
        yearlyInterest: yearlyInterest.toFixed(2),
        totalInterest:
          yearlyData.length === 0
            ? yearlyInterest.toFixed(2)
            : (
                parseFloat(yearlyData[i - 1].totalInterest) + yearlyInterest
              ).toFixed(2),
        investedCapital: investedCapital.toFixed(2),
      });
    }

    onShowTableChange(true);
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
      return;
    }
    calculateHandler();
  };

  // TODO FIX VALIDATION, NOT WORKING PROPERLY
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
