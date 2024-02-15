import { combiner } from "./combiner";
import { dictionaryToString } from "./dictionaryToString";
import { timeDiffrence } from "./timeDiffTwoEpooch";
import { wrongStateDistribution } from "./wrongStateDistribution";

function statesNotEnteredAccounter(array) {
  let statesNotEnteredDB = {};
  // if (!array[0][0]) statesNotEnteredDB["CRYPTO_INIT"] = 0;
  // if (!array[1][0]) statesNotEnteredDB["CRYPTO_COMPLETED"] = 0;
  // if (!array[2][0]) statesNotEnteredDB["FIAT_INIT"] = 0;
  // if (!array[3][0]) statesNotEnteredDB["FIAT_COMPLETED"] = 0;
  if (!array[0][0]) statesNotEnteredDB["CI"] = 0;
  if (!array[1][0]) statesNotEnteredDB["CC"] = 0;
  if (!array[2][0]) statesNotEnteredDB["FI"] = 0;
  if (!array[3][0]) statesNotEnteredDB["FC"] = 0;
  return statesNotEnteredDB;
}

function statesEnteredAccounter(statesEnteredDB, array) {
  // if (array[0][0]) statesEnteredDB["CRYPTO_INIT"] = array[0][0];
  // if (array[1][0]) statesEnteredDB["CRYPTO_COMPLETED"] = array[1][0];
  // if (array[2][0]) statesEnteredDB["FIAT_INIT"] = array[2][0];
  // if (array[3][0]) statesEnteredDB["FIAT_COMPLETED"] = array[3][0];
  statesEnteredDB = statesEnteredDB || {};
  if (array[0][0]) statesEnteredDB["CI"] = array[0][0] ;
  if (array[1][0]) statesEnteredDB["CC"] = array[1][0];
  if (array[2][0]) statesEnteredDB["FI"] = array[2][0];
  if (array[3][0]) statesEnteredDB["FC"] = array[3][0];

  return statesEnteredDB;
}

function v1DbMaker(DB){
  let newDB = {};
  for (let txid in DB){
    if( DB[txid][6]?.version === undefined){
      newDB[txid] = DB[txid]
    }
  }
  return newDB
}

export async function getAllDetails(startEpoch, endEpoch , DB , globalBitmap) {

  const temp = await combiner(startEpoch, endEpoch , DB , globalBitmap); // combines bitmap with all the txns of given txn id
  let txnDetail = v1DbMaker(temp);

  let successfullTxnTable = [];            // array of succesfull txns
  let unSuccessfullTxnTable = [];          // array of unsuccesfull txns
  let unSuccessfullTxnCount = 0;           // count representing unique unsuccessfull entries
  let successfullTxnCount = 0;             // count representing unique successfull entries
  let reasons = [];                        // analysis of unique txid and there possible reaosn of failur
  let pendingTxnTable = [];                // array of unsuccesfull txns

  for (let txid in txnDetail) {

    let txidDetail = txnDetail[txid];      // arr , [ [] , [] , [] , [] , [] , [] , [] , {} , txns]

    // successfull txns process
    if( txidDetail[3][0] === 1 ){
      
      successfullTxnCount++;
      for (let i = 6; i < txidDetail.length; i++){ // pushing sucessful txn entries into succ txn table

        if(txidDetail[i].status === "CRYPTO_COMPLETED")  // recording time diff btw 2 states
          txidDetail[i].elapsed_Time = timeDiffrence( txidDetail[0][1] , txidDetail[1][1] )
        else if(txidDetail[i].status === "FIAT_INIT")
          txidDetail[i].elapsed_Time = timeDiffrence( txidDetail[1][1] , txidDetail[2][1] )
        else if(txidDetail[i].status === "FIAT_COMPLETED")
          txidDetail[i].elapsed_Time = timeDiffrence( txidDetail[2][1] , txidDetail[3][1] )

        txidDetail[i].Total_elapsed_Time = timeDiffrence( txidDetail[0][1] , txidDetail[3][1] )
        
        successfullTxnTable.push(txidDetail[i]);
      }
    }
    /// unsuccessfull txn process
    else if( txidDetail[5][0] !== "CRYPTO_INIT" &&  txidDetail[5][0] !== "CRYPTO_COMPLETED" && txidDetail[5][0] !== "FIAT_INIT" ){  // to check if a transaction is really unsuccessfull and not pending
        unSuccessfullTxnCount++;

        for (let i = 6; i < txidDetail.length; i++) {
          unSuccessfullTxnTable.push(txidDetail[i]);
        }

        let reasonsTxn = {}; // this would be pushed to reasons .
        reasonsTxn["txid"] = txid;
        reasonsTxn["epoochDB"] = [
          txidDetail[0][1],
          txidDetail[1][1],
          txidDetail[2][1],
          txidDetail[3][1],
        ];

        reasonsTxn["statesNotEntered"] = statesNotEnteredAccounter(txidDetail.slice(0, 4));
        reasonsTxn["statesEntered"] = statesEnteredAccounter(txidDetail[4], txidDetail.slice(0, 4)); // a dictionary to recd states entered and how many times by a unsuccessfull txid.

        reasonsTxn["statesNotEntered1"] = dictionaryToString( reasonsTxn["statesNotEntered"] );
        reasonsTxn["statesEntered1"] = dictionaryToString(reasonsTxn["statesEntered"]);

        for (let i = 6; i < txidDetail.length; i++) {
          let txn = txidDetail[i];
          reasonsTxn["failure_desc"] = txn.failure_desc ? txn.failure_desc : " ";
          reasonsTxn["failure_code"] = txn.failure_code ? txn.failure_code : " ";
          reasonsTxn["bank_transaction_id"] = txn.bank_transaction_id ? txn.bank_transaction_id : " ";
          reasonsTxn["userId"] = txn.userId ? txn.userId : " ";
          reasonsTxn["txn_hash"] = txn.txn_hash ? txn.txn_hash : " ";
        }

        reasons.push(reasonsTxn);

      }
      // pending txn process
      else{
          let pendingTxn = {}

          pendingTxn["txid"] = txid;

          pendingTxn["statesNotEntered"] = statesNotEnteredAccounter(txidDetail.slice(0, 4));
          pendingTxn["statesEntered"] = statesEnteredAccounter(txidDetail[4], txidDetail.slice(0, 4)); // a dictionary to recd states entered and how many times by a unsuccessfull txid.

          pendingTxn["statesNotEntered1"] = dictionaryToString( statesNotEnteredAccounter(txidDetail.slice(0, 4)) );
          pendingTxn["statesEntered1"] = dictionaryToString( statesEnteredAccounter(txidDetail[4], txidDetail.slice(0, 4)) );

          pendingTxn["elapsed_Time"] = timeDiffrence(txidDetail[5][1] , 0);
          for (let i = 6; i < txidDetail.length; i++) {
            let txn = txidDetail[i];
            pendingTxn["userId"] = txn.userId ? txn.userId : " ";
            pendingTxn["txn_hash"] = txn.txn_hash ? txn.txn_hash : " ";
          }
          pendingTxnTable.push(pendingTxn);
      }
    }
  

  let errorDistribution = wrongStateDistribution(txnDetail);   // this is for the pink box

  let array = [];
  array.push(successfullTxnCount);
  array.push(successfullTxnTable);
  array.push(unSuccessfullTxnCount);
  array.push(unSuccessfullTxnTable);
  array.push(reasons);
  array.push(errorDistribution);
  array.push(pendingTxnTable)
  array.push(pendingTxnTable.length)

  // console.log(errorDistribution);
  // console.log("number of total txns btw time frame  :" , Object.keys(txnDetail).length)
  // console.log("txn detail after the combiner has joined bitmap and txns " , txnDetail);
  // console.log("reasons ", reasons);
  // console.log("reasons length " , reasons.length)
  // console.log("unSuccessfull Txn Table " , unSuccessfullTxnTable)
  // console.log("successfull Txn Table" , successfullTxnTable)
  // console.log("unSuccessfull Txn Count " , unSuccessfullTxnCount);
  // console.log("successfull Txn Count" , successfullTxnCount);
  // console.log("pending txns " , pendingTxnTable)
  // console.log("number of pending txns " , pendingTxnTable.length)

  return array;
}