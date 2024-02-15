import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { DashboardGlobal } from "./DashboardGlobal";
import { DashboardLocal } from "./DashboardLocal";
import { defaultDates } from "../../Logic/defaultDates";
import { getEpochTime } from "../../Logic/epochConverter";
import { combiner } from "../../Logic/combiner";
import { globalHelper } from "../../Logic/GlobalDashboardHelper";

export function Dashboard(props) {
  let defaultDate = defaultDates("same-day");

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [period, setPeriod] = useState("same-day");

  const [startEpooch, setStartEpooch] = useState(0);
  const [endEpooch, setEndEpooch] = useState(0);

  const [globalData, setGlobalData] = useState({});
  const [txnDB , setTxnDB] = useState({});

  async function DBmsnipulator() { // manipulating Db based on user selected time period

    const txnDB = await combiner(
      startEpooch,
      endEpooch,
      props.array[0],
      props.array[1]
    ); 

    // curating data for gl0bal menu ( top bar )

    const glblData = await globalHelper(txnDB); 
    setGlobalData(glblData);

    setTxnDB(txnDB);

  }

  useEffect(() => {
    let startEpoochValue;
    let endEpoochValue;

    const now = new Date();
    const currentTimeString = now.toLocaleTimeString();

    let startTime = "00:00";
    let endTime = currentTimeString.slice(0, 5);

    if (period !== "custom") {
      defaultDate = defaultDates(period); // getting start and end date
      const startDate1 = defaultDate[1];
      const endDate1 = defaultDate[0];

      startEpoochValue = getEpochTime(startDate1, startTime); // gettng start and end epooch
      endEpoochValue = getEpochTime(endDate1, endTime);
    }

    setStartEpooch(startEpoochValue);
    setEndEpooch(endEpoochValue);
  }, [period]);

  // to make changes when start date or end date is manipulated

  useEffect(() => {
    DBmsnipulator();
  }, [startEpooch , endEpooch]);

  function submitHandler() {

    let startEpoochValue = getEpochTime(startDate, "00:00");
    let endEpoochValue = getEpochTime(endDate, "00:00");

    setEndEpooch(endEpoochValue);
    setStartEpooch(startEpoochValue);
  }

  return (
    <div className="page">
      <DashboardGlobal data={globalData} />

      <div className="search">
        <span>
          <select
            className="timer"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
          >
            <option className="option" value="same-day">
              Day's Analysis
            </option>
            <option className="option" value="weekly">
              Week's Analysis
            </option>
            <option className="option" value="monthly">
              Month's Analysis
            </option>
            <option className="option" value="custom">
              Custom Selection
            </option>
          </select>
        </span>

        {period !== "custom" && <span>Please select a time range</span>}

        {period === "custom" && (
          <>
            <span className="inp2"> Start Date : </span>
            <input
              value={startDate}
              className="dateInput mr-2"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />

            <span className="inp2"> End Date : </span>
            <input
              value={endDate}
              className="dateInput mr-2"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />

            <button className="btn btn-dark m-2" onClick={submitHandler}>
              Submit , TO get TXN data
            </button>
          </>
        )}
      </div>

      <DashboardLocal txnDB = {txnDB} />
    </div>
  );
}
