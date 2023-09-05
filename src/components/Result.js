function Result(props) {
  const yearlyData = props.yearlyData;
  const showTable = props.showTable;
  if (!showTable) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ color: "red", content: "center" }}>
          please fill the inputs
        </h1>
      </div>
    );
  }
  if (showTable) {
    return (
      <table className="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {yearlyData.map((item) => {
            return (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{item.savings}</td>
                <td>{item.yearlyInterest}</td>
                <td>{item.totalInterest}</td>
                <td>{item.investedCapital}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
export default Result;
