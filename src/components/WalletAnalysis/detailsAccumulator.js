// import { ethers } from "ethers";

// import { getWalletBalance } from "./getWalletBalance";
// // csvData = {userId : [userId , address]}


// async function detailsAccumulator(csvData){

//     let userData = {};

//     for(let i in csvData){
//         const wallet_addr = csvData[i][1];
//         if(wallet_addr === undefined || wallet_addr.length !== 42){
//             delete csvData[i];
//         }
//     }

//     let tmp = {};
//     let cnt = 0;

//     for(let i in csvData){
//         if(cnt === 100){

//         }
        
//         tmp[i] = csvData[i]
//         cnt++;



//     }

// }

// export default detailsAccumulator;



import { downloadCSV } from './DownloadData';
import { getWalletBalance } from './getWalletBalance'; // Import your getWalletBalance function

async function detailsAccumulator(csvData) {
  let userData = {};

  // Remove entries with invalid wallet addresses
  for (let i in csvData) {
    const wallet_addr = csvData[i][1];
    if (wallet_addr === undefined || wallet_addr.length !== 42) {
      delete csvData[i];
    }
  }

  const batchSize = 100;
  const entries = Object.entries(csvData);

  while (entries.length > 0) {
    const currentBatch = entries.splice(0, batchSize);
    const currentBatchData = Object.fromEntries(currentBatch);

    try {
      const batchBalances = await getWalletBalance(currentBatchData);
      console.log(batchBalances);
      userData = { ...userData, ...batchBalances };
    } catch (error) {
      console.error('Error fetching USDT balances:', error);
      throw error;
    }
  }
  console.log(userData)
  if( Object.keys(userData).length !== 0) 
    downloadCSV(userData)

  return userData;
}

export default detailsAccumulator;