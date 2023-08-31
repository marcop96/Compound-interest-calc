import Header from "./components/Header";
import Result from "./components/Result";
import InvestmentForm from "./components/InvestmentForm";
import { useState } from "react";
function App() {
  const [yearlyData, setYearlyData] = useState([]);

  const handleYearlyDataChange = (data) => {
    setYearlyData(data);

    console.log(yearlyData);
  };
  return (
    <div>
      <Header />
      <InvestmentForm onYearlyDataChange={handleYearlyDataChange} />

      <Result yearlyData={yearlyData} />
    </div>
  );
}

export default App;
