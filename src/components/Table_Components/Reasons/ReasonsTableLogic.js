import * as React from "react";
import "../../Table_Components/table.css";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { ReasonsTableMaker } from "./ReasonsTableMaker";

function ReasonsTableLogic({ reasonsDB }) {
  const [db, setDb] = useState(reasonsDB); // DB = new DB created for each filter
  const [errorCode, setErrorCode] = useState("");

  const [show, setshow] = useState(0);

  const [failedState, setfailedState] = useState(""); // storing updates values from input fields
  const [failedDesc, setfailedDesc] = useState("");
  const [failedCode, setfailedCode] = useState("");
  const [loading , setLoading] = useState("false")

  const [count, setCount] = useState(reasonsDB.length); // number of txns in DB
  const [state, setState] = useState("buttons");

  const infuraEndpoint = "https://polygon-mainnet.infura.io/v3/112929d2321b47aca71e7288299533e3";
  let provider = new ethers.providers.JsonRpcProvider(infuraEndpoint);

  // for downloading reasons DB
  useEffect(() => {
    var reasonsDbSession = sessionStorage.getItem("reasonsDbSession");
    if (reasonsDbSession == null) {
      reasonsDbSession = reasonsDB;
    } else {
      reasonsDbSession = JSON.stringify(db);
    }

    sessionStorage.setItem("reasonsDbSession", reasonsDbSession);
  }, [db]);

  // on error code selection display of required inpur field. ( manual )
  useEffect(()=> {
    if (errorCode === "failedState") setshow(1); // failed state
    else if (errorCode === "failedDesc") setshow(2); // failed dec
    else if (errorCode === "failedCode") setshow(3); // failed code
    else if (errorCode === "normal") {
      setDb(reasonsDB);
      setCount(reasonsDB.length);
      setshow(0);
    }
    else if(errorCode === "buttons_failedState")
      forfailedState();
    else if(errorCode === "buttons_failedCode")
      forfailedCode();
    else if(errorCode === "buttons_failedDesc")
      forfailedDesc();
    
  },[errorCode , failedCode , failedDesc , failedState])

  // filtering based on error code.
  async function forfailedState() {
    let DB = [];

    async function checker(txnHash) {
      let check = await provider.getTransactionReceipt(txnHash);
      // console.log("status of txn hash", check);
      return check !== null ? check.status : check;
    }

    if (failedState === "CRYPTO_FAILED") {
      setLoading(true);
      for (let txn of reasonsDB) {
        if (
          txn.statesEntered.hasOwnProperty(failedState) &&
          txn.txn_hash[0] === "0" &&
          (await checker(txn.txn_hash)) === 1
        ) {
          txn.txn_hash = "https://polygonscan.com/tx/" + txn.txn_hash;
        }
      }
      setLoading(false);
    }

    for (let txn of reasonsDB) {
      if (txn.statesEntered.hasOwnProperty(failedState)) {
        DB.push(txn);
      }
    }
    console.log("failedState2", failedState);
    setCount(DB.length);
    setDb(DB);
  }

  function forfailedDesc() {
    let DB = [];
    for (let txn of reasonsDB) {
      if (txn.failure_desc === failedDesc) DB.push(txn);
    }
    setCount(DB.length);
    setDb(DB);
  }

  function forfailedCode() {
    let DB = [];
    for (let txn of reasonsDB) {
      if (txn.failure_code === failedCode) DB.push(txn);
    }
    setCount(DB.length);
    setDb(DB);
  }

  // only used in case of manual
  function submitHandler() {
    // this funciton calls all the fetch and calculation funcitons
    if (errorCode === "failedState" && failedState) 
      forfailedState();
    else if (errorCode === "failedDesc" && failedDesc) 
      forfailedDesc();
    else if (errorCode === "failedCode" && failedCode) 
      forfailedCode();
    else if (errorCode === "normal"){
      setDb(reasonsDB)
      setCount(reasonsDB.length)
    }
  }

  // for pre set buttons

  function crypto_failed() {
    setErrorCode("buttons_failedState");
    setfailedState("CRYPTO_FAILED");
  }

  function fiat_failed() {
    setErrorCode("buttons_failedState");
    setfailedState("FIAT_FAILED");
  }

  function normal_db() {
    setErrorCode("normal");
    submitHandler();
  }

  return (
    <>
      <div className="filter">
        <span>
          <select
            className="date1"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="Select state"
          >
            <option className="option" value="buttons">
              Pre Set Buttons
            </option>
            <option className="option" value="manual">
              Manual Selection
            </option>
          </select>
        </span>

        {state == "manual" && (
          <>
            <span>
              <select
                className="date1"
                onChange={(e) => setErrorCode(e.target.value)}
                value={errorCode}
                placeholder="Error Code"
              >
                <option className="option" value="normal">
                  Original Table
                </option>
                <option className="option" value="failedState">
                  Failed State
                </option>
                <option className="option" value="failedDesc">
                  Failed Desc
                </option>
                <option className="option" value="failedCode">
                  Failed Code
                </option>
              </select>
            </span>

            <span>
              {show === 1 && (
                <input
                  className="date1"
                  placeholder="Enter Failed state"
                  value={failedState}
                  onChange={(e) => setfailedState(e.target.value)}
                />
              )}
              {show === 2 && (
                <input
                  className="date1"
                  placeholder="Enter Failed desc"
                  value={failedDesc}
                  onChange={(e) => setfailedDesc(e.target.value)}
                />
              )}
              {show === 3 && (
                <input
                  className="date1"
                  placeholder="Enter Failed code"
                  value={failedCode}
                  onChange={(e) => setfailedCode(e.target.value)}
                />
              )}
            </span>

            <span>
              <button className="btn btn-dark me-3" onClick={submitHandler}>
                Submit
              </button>
              <span style={{ color: "white"}}>
                  count : {count}
              </span>
            </span>
          </>
        )}

        {state == "buttons" && (
          <span style={{ marginTop: "10px" }}>
            <span>
              <span style={{ color: "white" }}>count : {count}</span>

              <button className="m-2 date1 small-font" onClick={crypto_failed}>
                CRYPTO_FAILED
              </button>

              <button className="m-2 date1 small-font" onClick={fiat_failed}>
                FIAT_FAILED
              </button>

              <button className="m-2 date1 small-font" onClick={normal_db}>
                ORIGINAL_DB
              </button>
              
            </span>
          </span>
        )}
      </div>

      {db.length && <ReasonsTableMaker db={db} />}
      {!db.length && loading === "true" && failedState === "CRYPTO_FAILED" && (
        <h3 style={{ marginTop: "25px" }}>
          Please wait , txn hash for Crypto_failed are being validated.
        </h3>
      )}
      {!db.length && loading === "false" && failedState === "CRYPTO_FAILED" && (
        <h3 style={{ marginTop: "25px" }}>
          No transactions with this error , Kindly repress the button to be
          sure.{" "}
        </h3>
      )}
      {!db.length && failedState !== "CRYPTO_FAILED" && (
        <h3 style={{ marginTop: "25px" }}>
          No transactions with this error , Kindly repress the button to be
          sure.{" "}
        </h3>
      )}
    </>
  );
}

export default ReasonsTableLogic;
