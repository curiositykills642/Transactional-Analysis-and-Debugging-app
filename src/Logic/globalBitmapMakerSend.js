export function globalBitmapmakerSend(txnDB){

    let globalBitmapDB = {}

    let statusOrienter = { // used to set bitmap.
        META_TXN_INIT: 0,
        META_TXN_INIT_SUCCESS: 1,
        META_TXN_COMPLETED: 2 ,
    };

    for(let txn of txnDB){

        let currTxnEpoch = txn.createdAt;
        let txid = txn.txnId; // txid of that tha txn
        let txnStatus = txn.status; // txn status of that txn in curr obj

        let stat_pos = statusOrienter[txnStatus]; // stat_pos = the position og globalBitmapDB status in base array. exp crypto_init = 0

        let biggest_epooch = 0;
        
        if (!globalBitmapDB.hasOwnProperty(txid)) // globalBitmapDB[txid] = [[0, 0 ],[0, 0 ],[0, 0 ], {}]; // [ CRYPTO_INIT , CRYPTO_COMPLETED , FIAT_INIT , FIAT_COMPLETED  , object of WRONG_STATE , [biggest state , epooch] ]
            globalBitmapDB[txid] = [ [0, 0 ], [0, 0 ] ,[0, 0 ] , {} , ["" , 0]]; 

        if (!statusOrienter.hasOwnProperty(txnStatus)) {
            globalBitmapDB[txid][3][txnStatus] = !globalBitmapDB[txid][3].hasOwnProperty(txnStatus) ? 1: ++globalBitmapDB[txid][3][txnStatus];  // on encountering wrong state , it will add it too the list of wrong states and set its cnt to 1 , or increment it incase it had been encountered before
        } else {
            globalBitmapDB[txid][stat_pos][0] = 1 ; // if stat is encountered first time for txid it is set to 1 
            globalBitmapDB[txid][stat_pos][1] = currTxnEpoch; // eppoch for that txn is set 
        }

        if(biggest_epooch < currTxnEpoch){
            globalBitmapDB[txid][4][0] = txnStatus;
            globalBitmapDB[txid][4][1] = currTxnEpoch;
        }
    }
    // console.log(globalBitmapDB)
    return globalBitmapDB;
}