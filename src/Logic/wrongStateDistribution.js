export function wrongStateDistribution(txnDB){

    let err = {};

    for(let txid in txnDB){

        let wrongStates = txnDB[txid][4];

        if(Object.keys(wrongStates).length !== 0 && txnDB[txid][3][0] !== 1){
            for(let wrongState in wrongStates)
                err[wrongState] = err.hasOwnProperty(wrongState) ? err[wrongState] + wrongStates[wrongState] : wrongStates[wrongState] ;
        }
    }
    // console.log(err)

    delete err.CI;
    delete err.FI;
    delete err.CC;

    return err;
}