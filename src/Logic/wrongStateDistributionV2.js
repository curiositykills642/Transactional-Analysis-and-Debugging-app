export function wrongStateDistributionV2(txnDB){

    let err = {};

    for(let txid in txnDB){

        let wrongStates = txnDB[txid][7];

        if(Object.keys(wrongStates).length !== 0 && txnDB[txid][6][0] !== 1){
            for(let wrongState in wrongStates)
                err[wrongState] = err.hasOwnProperty(wrongState) ? err[wrongState] + wrongStates[wrongState] : wrongStates[wrongState] ;
        }
    }

    delete err.MTI;
    delete err.MTIS;
    delete err.MTC;
    delete err.CI;
    delete err.FI;
    delete err.CC;
    
    return err;
}