import { FetchTransactionDetail} from "./fetchTimeRangedTxnDB";

export async function combiner(startEpoch, endEpoch , DB , globalBitmap){
    let localTxnDB = await FetchTransactionDetail(startEpoch, endEpoch , DB);
    let localBitmap = {};

    for( let txid in localTxnDB){
        localBitmap[txid] = globalBitmap[txid].concat(localTxnDB[txid]);
    }

    // console.log("localBitmap" , localBitmap)
    return localBitmap;
}
