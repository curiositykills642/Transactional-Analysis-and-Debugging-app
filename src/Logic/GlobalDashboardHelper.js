export async function globalHelper(txnDB){

    const totalTxns = Object.entries(txnDB).length;
    let min = Number.MAX_VALUE;
    let max = 0;
    let avgVal = 0;
    let totalVal =0;
    let userDB = {};
    
    for( let txid in txnDB){

        let txidDetail = txnDB[txid];
        // console.log("txidDetail " , txidDetail);

        if(txidDetail[6].crypto_amount > 0){
            const txn_crypto_amt = Number(txidDetail[6].crypto_amount) ;
            if(  txn_crypto_amt < min)
                min = txn_crypto_amt;
            if ( txn_crypto_amt > max)
                max = txn_crypto_amt;

            totalVal = txn_crypto_amt + totalVal;
        }

        if(!userDB.hasOwnProperty(txidDetail[6].userId))
            userDB[txidDetail[6].userId] = 1;
        // else    
        //     userDB[txidDetail[6].userId]++;
    }
    // to test if unique user id are tru or not
    // let gun = 0;
    // for(let key in userDB){
    //     gun += userDB[key];
    // }
    // console.log(gun);
    avgVal = totalVal / totalTxns;

    const data = {};
    data["cnt"] = Number(totalTxns);
    data["min"] = min !== Number.MAX_VALUE ? Number(min.toFixed(3)) : 0;
    data["max"] = Number(max.toFixed(3));
    data["avgVal"] = Number(avgVal.toFixed(3));
    data["totalVal"] = Number(totalVal.toFixed(3));
    data["uniqueUserIds"] = Object.keys(userDB).length;

    // console.log("no. of users who offramped there monies $$ : " , Object.keys(userDB).length)
    // console.log("txnDB : " , txnDB);
    // console.log("totalTxns : " , totalTxns);
    // console.log("min : " , min);
    // console.log("max : " , max);
    // console.log("totalVal : " , totalVal);
    // console.log("data : " , data);

    return data;
}

    