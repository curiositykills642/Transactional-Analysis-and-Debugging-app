import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { getEpochTime } from "../../Logic/epochConverter";
import { getAllDetails } from "../../Logic/fetchTxnDetail";
import { defaultDates } from "../../Logic/defaultDates";
import { convertEpochToIST } from "../../Logic/convertEpochToIST";

import Box from "./Box";

import UnSuccesfullTableMaker from "../Table_Components/unSuccessfull/UnSuccesfullTableMaker";
import { SuccesfullTableMaker } from "../Table_Components/Sucessfull/SuccesfullTableMaker";
import PendingTableLogic from "../Table_Components/Pending/PendingTableLogic"
import ReasonsTableLogic from "../Table_Components/Reasons/ReasonsTableLogic";
import { csvMaker } from "../Table_Components/Download/csvMaker";

import { FcCheckmark} from "react-icons/fc";
import { FaHourglassHalf , FaListAlt} from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { MdDangerous } from "react-icons/md";

function App( props ) {
  const defaultDate = defaultDates("daily");
  const [startDate, setStartDate] = useState(defaultDate[1]);
  const [endDate, setEndDate] = useState(defaultDate[0]);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const [dataArray, setDataArray] = useState([]);
  const [tableName, setTableName] = useState("");
  const [hidden, setHidden] = useState(0); // hide or unhide table 1 = succ table , 2 = unsucc table , 3 = reasons table , 0 = no table.
  const [stage, setStage] = useState("prod");

  const [dynamoDB_Pre, setDynamoBD_Pre] = useState([]);
  const [dynamoDB_Prod, setDynamoBD_Prod] = useState([]);
  const [globalBitmap_Pre, setGlobalBitmap_Pre] = useState({});
  const [globalBitmap_Prod, setGlobalBitmap_Prod] = useState({});
  const [ titles , setTittles] = useState([]);
  const [ contents , setContents] =  useState([]);

  const startEpoch = getEpochTime(startDate, startTime); // setting startEpohTime to epoch of start.
  const endEpoch = getEpochTime(endDate, endTime); // // setting endEpohTime to epoch of end.

  // alert on exit // this makes sure a user is doesnt exit by mistake.
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Are you Sure want to EXIT the page ?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // controlling what table gets displayed
  useEffect(() => {
    function handleHiddenChange() {
      if (hidden === 1) {
        setTableName("Successfull Transactions ( Row Count : " + dataArray[1].length + " )");
      } 
      else if (hidden === 2) {
        setTableName("Unsuccessfull Transactions ( Row Count : " + dataArray[3].length + " )");
      } 
      else if (hidden === 3) {
        setTableName("Pending Transactions ( Row Count : " + dataArray[6].length + " )");
      }
      else if (hidden === 4) {
        setTableName("Unsuccessfull Transaction's Reason");
        const keys = Object.keys(dataArray[5]);
        const values = Object.values(dataArray[5]);
        setContents(values);
        setTittles(keys);
      } 
      else if (hidden === 5) {
        setTableName("Global Transactions Table ( Row Count : " + dynamoDB_Prod.length + " )");
      }

      if(hidden !== 4 && dataArray.length !== 0){
        notes();
      }
    }
  
    handleHiddenChange();
  }, [hidden]);

  // loading up data from navbar on render and on render state handling
  useEffect(() => {
    async function setDB() { // preprod data , globalbitmap preprod
      setDynamoBD_Prod(props.array[0]);
      setGlobalBitmap_Prod(props.array[1]);
      setDynamoBD_Pre(props.array[2]);
      setGlobalBitmap_Pre(props.array[3]);

      // setHidden(5); // this is used to load original dynamo DB. at data load up

      setTittles(['Succesfull Txn\'s ', 'UnSuccesfull Txn\'s ', 'Pending Txn\'s ' , 'All Txn\'s']);
      setContents(['Select Dates', ' -- ', ' -- ' ,  ' -- ']);
    }
    setDB();
  }, []);

  // whenever the gloabal bitmap is changed submithandler is called
  useEffect(() => {
    submitHandler();
  },[globalBitmap_Prod , globalBitmap_Pre])

  // handle default display of box
  function notes(){
    setTittles(['Succesfull Txn\'s ', 'UnSuccesfull Txn\'s ', 'Pending Txn\'s ' , 'All Txn\'s']);

    let counts = [ dataArray[0]  , dataArray[2] , dataArray[7] , dataArray[0] + dataArray[2] + dataArray[7]];
    setContents(counts);
  }
  async function submitHandler() {

    let DB = stage === "prod" ? dynamoDB_Prod : dynamoDB_Pre;
    let bitmap = stage === "prod" ? globalBitmap_Prod : globalBitmap_Pre;

    let arr = await getAllDetails(startEpoch, endEpoch, DB, bitmap);
    setDataArray(arr); // setting all the of succ , unsucc , reasons , etc

    let counts = [ arr[0]  , arr[2] , arr[7] , arr[0] + arr[2] + arr[7]];
    setContents(counts);

    console.log("time",convertEpochToIST(1689843528));

    setHidden(1);
  }

  function handleDownload() {
    if (hidden === 1) {
      console.log("downloading succesfullTxnsTable.csv");
      csvMaker(dataArray[1], "succesfull");
    } else if (hidden === 2) {
      console.log("downloading unSuccesfullTxnsTable.csv");
      csvMaker(dataArray[3], "unsuccesfull");
    } else if (hidden === 3) {
      console.log("downloading PendingTxnsTable.csv");
      csvMaker( dataArray[6] , "Pending");
    } else if (hidden === 4) {
      console.log("downloading reasonsForUnSuccesfullTxnsTable.csv");
      var reasonsDbSession = sessionStorage.getItem("reasonsDbSession");
      let db1 = reasonsDbSession !== undefined ? reasonsDbSession : dataArray[4];
      if(typeof db1 === "string")
        db1 = JSON.parse(db1);
      console.log(db1)
      csvMaker(db1, "reasons");
    } else if (hidden === 5) {
      console.log("downloading AllTxnsTable.csv");
      csvMaker(dynamoDB_Prod, "AllTxnsTable");
    }
  }

  return (
    <div className="App">
      <div className="inp">
        <span className="inp1">
          <span className="inp2">Start Date : </span>
          <input
            value={startDate}
            className="date mr-2"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            value={startTime}
            type="time"
            className="time mr-2"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </span>

        <span>
          <span className="inp2">End Date : </span>
          <input
            value={endDate}
            className="date mr-2"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            value={endTime}
            className="time mr-2"
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </span>

        <span>
          <button className="btn btn-dark m-4" onClick={submitHandler}>
            Submit , TO get TXN data
          </button>
        </span>

        <span>
          <button
            className="btn btn-dark m-1"
            onClick={() => setStage("pre-prod")}
          >
            Pre-Prod
          </button>
        </span>

        <span>
          <button className="btn btn-dark m-1" onClick={() => setStage("prod")}>
            Prod
          </button>
        </span>

        <span>
          <h5 style={{ marginBottom: "0px", paddingBottom: "0.5rem" }}>
          Redeem V1 , Set To {stage}
          </h5>
        </span>
      </div>

      <div style={{ display: "flex" }}>
        <div className="functions">
          <div>
            <Box titles={titles} contents={contents} />
          </div>

          <h3 className="inp3 button-container">Functions</h3>

          <div className="button-container">
            <button className="btn btn-dark m-2" onClick={() => setHidden(1)}>
              <FcCheckmark/> Succesfull Txn's Table
            </button>
          </div>

          <div className="button-container">
            <button className="btn btn-dark m-2" onClick={() => setHidden(2)}>
              <MdDangerous/> Unsuccesfull Txn's Table
            </button>
          </div>

          <div className="button-container">
            <button className="btn btn-dark m-2" onClick={() => setHidden(3)}>
              <FaHourglassHalf/> Pending Txn's Table
            </button>
          </div>

          <div className="button-container">
            <button className="btn btn-dark m-2" onClick={() => setHidden(4)}>
              <BiCommentDetail/> Reason for UnSuccessfull
            </button>
          </div>

          <div className="button-container">
            <button className="btn btn-dark m-2" onClick={() => setHidden(5)}>
              <FaListAlt/> GLOBAL TXN'S
            </button>
          </div>

        </div>

        <div className="table">
          {hidden !== 0 && (
            <h3 className="inp3">
              {tableName}
              <button
                className="btn btn-dark m-3 print"
                onClick={handleDownload}
              >
                Download
              </button>
            </h3>
          )}

          <div className="inp3">
            {hidden === 1 && SuccesfullTableMaker(dataArray[1])}
            {hidden === 2 && UnSuccesfullTableMaker(dataArray[3])}
            {hidden === 3 && <PendingTableLogic pendingDB = {dataArray[6]} />}
            {hidden === 4 && <ReasonsTableLogic reasonsDB={dataArray[4]} />}
            {hidden === 5 && UnSuccesfullTableMaker(dynamoDB_Prod)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


