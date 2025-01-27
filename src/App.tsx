import React from "react";
import LoanCalculator from "../src/component/loadCalculator";

const App: React.FC = () => {
  return (
    <div>
      <h1>เว็บคำนวณการผ่อนอย่างมืออาชีพ SmartPay Calculate</h1>
      <LoanCalculator />
    </div>
  );
};

export default App;