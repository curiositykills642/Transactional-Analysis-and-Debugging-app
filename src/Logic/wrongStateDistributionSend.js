export function wrongStateDistributionSend(txnDB){

    let err = {};

    for(let txid in txnDB){

        let wrongStates = txnDB[txid][3];

        if(Object.keys(wrongStates).length !== 0 && txnDB[txid][2][0] !== 1){
            for(let wrongState in wrongStates)
                err[wrongState] = err.hasOwnProperty(wrongState) ? err[wrongState] + wrongStates[wrongState] : wrongStates[wrongState] ;
        }
    }
    // console.log(err)

    delete err.MTI;
    delete err.MTIS;
    delete err.MTC;
    
    return err;
}