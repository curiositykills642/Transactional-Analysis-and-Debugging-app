
// it creates a array of txns in given time range

export async function FetchTransactionDetailSend(startEpoch, endEpoch, txnDB) {

    let newTxnDB = {}; // the new data format with bitmap
  
    for (let txn of txnDB) {
      let currTxnEpoch = txn.createdAt;
      let txid = txn.txnId; // txid of that tha txn
  
      if (currTxnEpoch >= startEpoch && currTxnEpoch <= endEpoch) {
        if (!newTxnDB.hasOwnProperty(txid)) // newTxnDB[txid] = [[0, 0], [0, 0], [0, 0], [0, 0], [biggest state , epooch] , {}]; // [ CRYPTO_INIT , CRYPTO_COMPLETED , FIAT_INIT , FIAT_COMPLETED , array of WRONG_STATE ]
          newTxnDB[txid] = []; 
  
        newTxnDB[txid].push(txn);
      }
    }
    return newTxnDB;
  }
  
  