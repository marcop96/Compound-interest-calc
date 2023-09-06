import Header from "./components/Header";
import Result from "./components/Result";
import InvestmentForm from "./components/InvestmentForm";
import { useState } from "react";
import React from 'react'

function App() {
  const [yearlyData, setYearlyData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const handleYearlyDataChange = (data) => {
    setYearlyData(data);
  };

  return (
    <div>
      <Header />
      <InvestmentForm
        onYearlyDataChange={handleYearlyDataChange}
        onShowTableChange={setShowTable}
      />

      <Result yearlyData={yearlyData} showTable={showTable} />
    </div>
  );
}

export default App;
