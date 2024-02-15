import { FetchTransactionDetailSend } from "./fetchTimeRangedTxnDBSend";

export async function combinerSend(startEpoch, endEpoch , DB , globalBitmap){
    let localTxnDB = await FetchTransactionDetailSend(startEpoch, endEpoch , DB);
    let localBitmap = {};

    for( let txnId in localTxnDB){
        localBitmap[txnId] = globalBitmap[txnId].concat(localTxnDB[txnId]);
    }

    console.log("localBitmap" , Object.keys(localBitmap).length)
    return localBitmap;
}

