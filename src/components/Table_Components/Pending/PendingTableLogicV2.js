import * as React from "react";
import "../../Table_Components/table.css";
import { useState, useEffect, useRef } from "react";
import { PendingTableMaker } from "./PendingTableMaker";

function PendingTableLogicV2({ pendingDB }) {
  const [db, setDb] = useState(pendingDB); // DB = new DB created for each filter

  const [time, setTime] = useState(0); // more than or less then
  const [dbSortState, setDbSortState] = useState("more-thn"); // time sort state

  const [stuckState, setStuckState] = useState("OG"); // ye voh state hai jo stuck hai
  const [count, setCount] = useState(pendingDB.length); // number of txns in DB

  // console.log(pendingDB)

  // for downloading pending DB sstroing it in local storage
  useEffect(() => {
    var pendingDbSession = sessionStorage.getItem("pendingDbSession");
    if (pendingDbSession == null) {
      pendingDbSession = pendingDB;
    } else {
      pendingDbSession = JSON.stringify(db);
    }

    sessionStorage.setItem("pendingDbSession", pendingDbSession);
  }, [db]);

  function forStuckState() {

    let DB = [];
        
    let intTime = parseInt(time);

    if(intTime !== 0){
      if(dbSortState === "more-thn"){
        for (let txn of pendingDB){
          console.log("time",typeof txn.elapsed_Time)
          if(parseInt(txn.elapsed_Time) > intTime){
            DB.push(txn)
          }
        }
      }else{
        for (let txn of DB){
          if(parseInt(txn.elapsed_Time) < intTime){
            DB.push(txn)
          }
        }
      }
    }else{
      DB = pendingDB;
    }

    let DB1 = []

    if(stuckState !== "OG"){
      // again filter the db for that particular state.
      console.log("entered here" , stuckState);
      for (let txn of DB) {
        if(txn.statesEntered1.substring(txn.statesEntered1.length - stuckState.length) === stuckState){
          DB1.push(txn)
        }
      }
    }

    if(stuckState !== "OG"){
      setDb(DB1);
      setCount(DB1.length);
    }else{
      setDb(DB);
      setCount(DB.length);
    }

    console.log("DB" , DB);
    console.log("DB1" , DB1);

  }

  useEffect(() => {
    forStuckState();    
  },[stuckState , dbSortState , time])

  return (
    <>
      <div className="filter">   
        <span style={{ marginTop: "10px" }}>

        <span>
          <select className="date1" onChange={(e) => setDbSortState(e.target.value)} value={dbSortState} placeholder="Select state" style={{ width: '110px' }} >
            <option className="option" value="more-thn">
              More thn
            </option>
            <option className="option" value="less-thn">
              Less thn
            </option>
          </select>
          
          <input className="date1" placeholder="Time(Hrs)" value={time} onChange={(e) => setTime(e.target.value)}  style={{ width: '60px' }}/>
        </span>
          <span style={{ color: "white" }}> count : {count} </span>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('MTI')}>
            META_TXN_INIT_STUCK
          </button>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('MTIS')}>
            META_TXN_INIT_SUCCESS_STUCK
          </button>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('MTC')}>
            META_TXN_COMPLETED_STUCK
          </button>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('CI')}  >
            CRYPTO_INIT_STUCK
          </button>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('CC')} >
            CRYPTO_COMPLETED_STUCK
          </button>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('FI')}>
            FIAT_INIT_STUCK
          </button>
          <button className="m-2 date1 small-font" onClick={() => setStuckState('OG')}>
            ORIGINAL_DB
          </button>
        </span>
      </div>

      {db.length && <PendingTableMaker db={db} />}
      {!db.length && <p>no transaction found</p>}
    </>
  );
}

export default PendingTableLogicV2;
