import { useState, useEffect } from "react";
import "./WalletAnalysis.css"
import FileUpload from './FileUpload';

import detailsAccumulator from "./detailsAccumulator";
import { getWalletBalance } from "./getWalletBalance";
import { ethers } from "ethers";

export function WalletAnalysis(){

    const [csvData , setCsvData] = useState({}); // {userid : [userid , address]}
    const [userData , setUserData] = useState({}); // {userid : [userid , address , wallet balance]}

    const handleFileRead = (filename, content) => {
        // Parse the CSV content into an array of arrays
        const csvData = content.split('\n').map((row) => row.split(','));

        let userData = {};

        for(let i in csvData){
            userData[csvData[i][0]]=csvData[i];
        }
    
        setCsvData(userData);
    };

    // yha pe apn ko user data mein wallet balance and offramp details add karni hai uske baad table show and download option dena hai
    // useEffect(()=>{
    //     let tempObj = {};
    //     for(let userId in csvData){
    //         let arr = csvData[userId];
    //         const bal = await detailsAccumulator(csvData[userId][1])
    //         arr.push(bal);
    //         tempObj[userId].push(arr);
    //     }
    //     setUserData(tempObj)
    //     console.log(tempObj)
    // },[csvData])

    useEffect(()=>{     
        if (csvData) {
            dealer();
          }
    },[csvData])

    async function dealer(){
        let data = await detailsAccumulator(csvData);
        // console.log(data)
        setUserData(data);
        // let bb = await getWalletBalance("0xe75580b5bae2b3f0cfe50a95e94988f17b40410a")
        // bb = ethers.utils.formatEther(bb)
        // console.log(bb);
    }
    
    return(
        <>
            <div className="excelInput">
                <h1>Drag and Drop Box (CSV files)</h1>
                <FileUpload onFileRead={handleFileRead} />
            </div>
        </>
    )
}

// drop box and then 

// minimum and max amount of offramp , 2 input field
// minimum and maximum amount of balance , 2 input field
// download button , 1 button


// display user id , all related txnids ,  amt off ramped , amt in wallet 