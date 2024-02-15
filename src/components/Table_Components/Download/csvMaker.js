import * as FileSaver from "file-saver";

export function csvMaker(DB , type){
    let data = [];

    if(type === "reasons"){
        let keys = ["txid" , "statesEntered" , "statesNotEntered" , "failure_desc" , "failure_code" , "userId" , "bank_transaction_id"  , "txn_hash"];
        data.push(keys);

        for(let i = 0 ; i < DB.length; i++){

            let txn = DB[i]; // obj = {txod = "" , statesnotentered = {} , ....}
            let row = [];

            for(let j=0 ; j < keys.length; j++) {
                const property = keys[j];
                if( txn[property] !== undefined && txn[property] !== null ) {
                    if(property === "statesEntered" || property === "statesNotEntered"){
                        let entry = ""
                        for( let key in txn[property]){
                            entry = entry + key + " : " + txn[property][key] + " ";
                        }
                        row.push(entry);
                    }
                    else
                        row.push(txn[property]);
                } else {
                    row.push(" ");
                }
            }
            
            data.push(row); 
        }
    }
    else if(type === "Pending"){
        let keys = ["txid" , "statesEntered" , "statesNotEntered" , "elapsed_Time" , "userId" , "bank_transaction_id" , "txn_hash"];
        data.push(keys);

        for(let i = 0 ; i < DB.length; i++){

            let txn = DB[i]; // obj = {txod = "" , statesnotentered = {} , ....}
            let row = [];

            for(let j=0 ; j < keys.length; j++) {
                const property = keys[j];
                if( txn[property] !== undefined && txn[property] !== null ) {
                    if(property === "statesEntered" || property === "statesNotEntered"){
                        let entry = ""
                        for( let key in txn[property]){
                            entry = entry + key + " : " + txn[property][key] + " ";
                        }
                        row.push(entry);
                    }
                    else
                        row.push(txn[property]);
                } else {
                    row.push(" ");
                }
            }
            
            data.push(row);
        }
    }
    else{
        let arr = ["txId" , "status" , "createdAt" , "address" , "failure_code" , "bank_transaction_id" , "failure_desc" ,  "exchange_rate" , "fiat_amount" , "fiat_symbol" , "source_id" , "userId" , "account_no" , "crypto_amount" , "crypto_symbol" , "transaction_type" , "txn_hash" ];
        data.push(arr);
        for(let i = 0 ; i < DB.length; i++){
            let obj = DB[i];
            let row = [];

            for(let j=0; j<arr.length; j++) {
                const property = arr[j];
                if( obj[property] !== undefined && obj[property] !== null ) {
                    row.push(obj[property]);
                } else {
                    row.push(" ");
                }
            }
            
            data.push(row);
        }
    }

    let csvContent = data.map((e) => e.join(",")).join("\n"); // rows is the name of array.
    let file =  new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    if (type === "unsuccesfull")
        FileSaver.saveAs(file, "UnSuccessfullTransactions.csv"); // The file name can be changed here
    else if (type === "succesfull")
        FileSaver.saveAs(file, "SuccessfullTransactions.csv"); // The file name can be changed here
    else if (type === "reasons")
        FileSaver.saveAs(file, "reasons_for_UnSuccessfullTransactions.csv"); // The file name can be changed here
    else if ( type === "AllTxnsTable")
        FileSaver.saveAs(file, "AllTxnsDB.csv"); // The file name can be changed here
    else if ( type === "Pending")
        FileSaver.saveAs(file, "PendingTxns.csv"); // The file name can be changed here

}