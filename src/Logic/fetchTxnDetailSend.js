import { combinerSend } from "./combinerSend";
import { dictionaryToString } from "./dictionaryToString";
import { timeDiffrence } from "./timeDiffTwoEpooch";
import { wrongStateDistributionSend } from "./wrongStateDistributionSend";

function statesNotEnteredAccounter(array) {
  let statesNotEnteredDB = {};
  if (!array[0][0]) statesNotEnteredDB["MTI"] = 0;
  if (!array[1][0]) statesNotEnteredDB["MTIS"] = 0;
  if (!array[2][0]) statesNotEnteredDB["MTC"] = 0;
  return statesNotEnteredDB;
}

function statesEnteredAccounter(statesEnteredDB, array) {
  statesEnteredDB = statesEnteredDB || {};
  if (array[0][0]) statesEnteredDB["MTI"] = array[0][0] ;
  if (array[1][0]) statesEnteredDB["MTIS"] = array[1][0];
  if (array[2][0]) statesEnteredDB["MTC"] = array[2][0];

  return statesEnteredDB;
}

export async function getAllDetailsSend(startEpoch, endEpoch , DB , globalBitmapSend) {

  let txnDetail = await combinerSend(startEpoch, endEpoch , DB , globalBitmapSend); // combines bitmap with all the txns of given txn id
  
  let successfullTxnTable = [];            // array of succesfull txns
  let unSuccessfullTxnTable = [];          // array of unsuccesfull txns
  let unSuccessfullTxnCount = 0;           // count representing unique unsuccessfull entries
  let successfullTxnCount = 0;             // count representing unique successfull entries
  let reasons = [];                        // analysis of unique txid and there possible reaosn of failur
  let pendingTxnTable = [];                // array of unsuccesfull txns

  for (let txid in txnDetail) {

    let txidDetail = txnDetail[txid];      // arr , [ [0] , [1] , [2] , [3] , [4] , [5] , [6] , {7} , [8] ,txns]

    // successfull txns process
    if( txidDetail[2][0] === 1 ){
      
      successfullTxnCount++;
      for (let i = 5; i < txidDetail.length; i++){ // pushing sucessful txn entries into succ txn table

        if(txidDetail[i].status === "META_TXN_INIT_SUCCESS")
          txidDetail[i].elapsed_Time = timeDiffrence( txidDetail[0][1] , txidDetail[1][1] )
        else if(txidDetail[i].status === "META_TXN_COMPLETED")
          txidDetail[i].elapsed_Time = timeDiffrence( txidDetail[1][1] , txidDetail[2][1] )
       
        txidDetail[i].Total_elapsed_Time = timeDiffrence( txidDetail[0][1] , txidDetail[2][1] )
        
        successfullTxnTable.push(txidDetail[i]);
      }
    }
    /// unsuccessfull txn process
    else if( txidDetail[4][0] !== "META_TXN_INIT_SUCCESS" && txidDetail[4][0] !== "META_TXN_INIT" && txidDetail[4][0] !== "META_TXN_COMPLETED" ){  // to check if a transaction is really unsuccessfull and not pending
        unSuccessfullTxnCount++;

        for (let i = 5; i < txidDetail.length; i++) {
          unSuccessfullTxnTable.push(txidDetail[i]);
        }

        let reasonsTxn = {}; // this would be pushed to reasons .
        reasonsTxn["txid"] = txid;
        reasonsTxn["epoochDB"] = [
          txidDetail[0][1],
          txidDetail[1][1],
          txidDetail[2][1],
        ];

        reasonsTxn["statesNotEntered"] = statesNotEnteredAccounter(txidDetail.slice(0, 3));
        reasonsTxn["statesEntered"] = statesEnteredAccounter(txidDetail[3], txidDetail.slice(0, 3)); // a dictionary to recd states entered and how many times by a unsuccessfull txid.

        reasonsTxn["statesNotEntered1"] = dictionaryToString( reasonsTxn["statesNotEntered"] );
        reasonsTxn["statesEntered1"] = dictionaryToString(reasonsTxn["statesEntered"]);

        for (let i = 5; i < txidDetail.length; i++) {
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
          pendingTxn["statesNotEntered"] = statesNotEnteredAccounter(txidDetail.slice(0, 3));
          pendingTxn["statesEntered"] = statesEnteredAccounter(txidDetail[3], txidDetail.slice(0, 3)); // a dictionary to recd states entered and how many times by a unsuccessfull txid.

          pendingTxn["statesNotEntered1"] = dictionaryToString( pendingTxn["statesNotEntered"] );
          pendingTxn["statesEntered1"] = dictionaryToString( pendingTxn["statesEntered"] );

          pendingTxn["elapsed_Time"] = timeDiffrence(txidDetail[4][1] , 0);
          for (let i = 5; i < txidDetail.length; i++) {
            let txn = txidDetail[i];
            pendingTxn["userId"] = txn.userId ? txn.userId : " ";
            pendingTxn["txn_hash"] = txn.txn_hash ? txn.txn_hash : " ";
          }
          pendingTxnTable.push(pendingTxn);
      }
    }
  

  let errorDistribution = wrongStateDistributionSend(txnDetail);   // this is for the pink box

  let array = [];
  array.push(successfullTxnCount);
  array.push(successfullTxnTable);
  array.push(unSuccessfullTxnCount);
  array.push(unSuccessfullTxnTable);
  array.push(reasons);
  array.push(errorDistribution);
  array.push(pendingTxnTable)
  array.push(pendingTxnTable.length)

  console.log("array",array);

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