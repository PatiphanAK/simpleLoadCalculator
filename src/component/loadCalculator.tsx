import React, { useState, useEffect } from "react";
import {
  calculatePMT,
  calculateTotalInterest,
  calculateTotalPayment,
} from "../utils/loadCalculator";
import "./loadCalulator.css";

const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("en-US").format(number);
  };

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(0); // เงินต้น (PV)
  const [interestRate, setInterestRate] = useState<number>(0); // อัตราดอกเบี้ยต่อปี (i)
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(0); // จำนวนงวด
  const [timeUnit, setTimeUnit] = useState<"months" | "years">("months"); // หน่วยเวลา (เดือน/ปี)
  const [calculationType, setCalculationType] = useState<"flat" | "reducing">("reducing"); // ประเภทการคำนวณ
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null); // รายจ่ายต่อเดือน (PMT)
  const [totalInterest, setTotalInterest] = useState<number | null>(null); // ดอกเบี้ยรวม
  const [totalPayment, setTotalPayment] = useState<number | null>(null); // ยอดชำระรวม

  useEffect(() => {
    // แปลงจำนวนงวดเป็นเดือนหากเลือกหน่วยเป็นปี
    const periodsInMonths = timeUnit === "years" ? numberOfPeriods * 12 : numberOfPeriods;

    // คำนวณผลลัพธ์
    const pmt = calculatePMT(principal, interestRate, periodsInMonths, calculationType);
    const totalInt = calculateTotalInterest(pmt, periodsInMonths, principal);
    const totalPay = calculateTotalPayment(pmt, periodsInMonths);

    setMonthlyPayment(pmt);
    setTotalInterest(totalInt);
    setTotalPayment(totalPay);
  }, [principal, interestRate, numberOfPeriods, timeUnit, calculationType]);

  return (
    <div className="loan-calculator">
      <h2>คำนวณสินเชื่อคงที่</h2>
      <div>
        <label>เงินต้น (PV, THB): </label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>อัตราดอกเบี้ยต่อปี (i, %): </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>จำนวนงวด: </label>
        <input
          type="number"
          value={numberOfPeriods}
          onChange={(e) => setNumberOfPeriods(parseFloat(e.target.value))}
        />
        <label>
          <input
            type="radio"
            value="months"
            checked={timeUnit === "months"}
            onChange={() => setTimeUnit("months")}
          />
          เดือน
        </label>
        <label>
          <input
            type="radio"
            value="years"
            checked={timeUnit === "years"}
            onChange={() => setTimeUnit("years")}
          />
          ปี
        </label>
      </div>
      <div>
        <label>ประเภทการคำนวณ: </label>
        <select
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value as "flat" | "reducing")}
        >
          <option value="flat">Flat</option>
          <option value="reducing">Reducing Balance</option>
        </select>
      </div>

      {monthlyPayment !== null && (
        <div className="result">
          <h3>คำนวณผลลัพธ์</h3>
          <p>รายจ่ายต่อเดือน (PMT): {formatNumber(monthlyPayment)} THB</p>
          <p>ดอกเบี้ยรวม: {formatNumber(totalInterest!)} THB</p>
          <p>ยอดชำระรวม: {formatNumber(totalPayment!)} THB</p>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;