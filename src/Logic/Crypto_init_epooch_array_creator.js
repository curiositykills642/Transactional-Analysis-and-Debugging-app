/*

    data should be in asceding order
    data should be [{time : , value : }]

    */

function epochToDayEpoch(epoch){
    // console.log(86400 * Math.floor(epoch/86400000));
    return (86400 * Math.floor(epoch/86400000));
}

function epochDbMaker(txnDB){

    let epochDB = {
    };
    
    for(let txn in txnDB){
        let epoch = txnDB[txn][3][1];
        
        epoch = epochToDayEpoch(epoch);            
        
        if(epoch !== 0){
            if(epochDB.hasOwnProperty(epoch))
                epochDB[epoch]++;
            else
                epochDB[epoch] = 1;
        }
    }
    // console.log(epochDB)
    return epochDB;
}

function chartDbMaker(txnDB){
    let epochDB = epochDbMaker(txnDB);
    let chartDB = [];
    for(let date in epochDB){
        let a = {};
        a.time = parseInt(date);
        a.value = epochDB[date];
        chartDB.push(a);
    }
    return chartDB;
}

export function crypto_init_epooch_array_creator( { txnDB } ){
    let chartDB = chartDbMaker(txnDB);
    return chartDB;
}
