export function successfullTxns(txnDetail){

    let successfullTxnCount = 0;

    for (let txid in txnDetail) {

        let txidDetail = txnDetail[txid];      // arr , [ [] , [] , [] , [] , {} , txns]
        let flag = txidDetail[0][0] + txidDetail[1][0] + txidDetail[2][0] + txidDetail[3][0]; // to check if it went through all 4 states or not
    
        if (flag === 4) 
            successfullTxnCount++;
    }

    return successfullTxnCount;
}
