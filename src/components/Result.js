function Result(props) {
  const yearlyData = props.yearlyData;

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
              <td>{item.savingsEndOfYear}</td>
              <td>{item.yearlyInterest}</td>
              <td>{item.yearlyInterest + item.savingsEndOfYear}</td>
              <td>{item.yearlyContribution}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Result;
