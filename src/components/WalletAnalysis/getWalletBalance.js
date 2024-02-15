
import { ethers } from 'ethers';
import usdtABI from './usdtABI.json';

const infuraEndpoint = 'https://polygon-mainnet.infura.io/v3/112929d2321b47aca71e7288299533e3';
const provider = new ethers.providers.JsonRpcProvider(infuraEndpoint);

const usdt_Addr = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
const Contract = new ethers.Contract(usdt_Addr, usdtABI, provider);

export async function getWalletBalance(userdata) {
  try {
    const balancePromises = Object.entries(userdata).map(async ([userId, [userid, walletAdyy]]) => {
      const balanceInWei = await Contract.balanceOf(walletAdyy);
      const balanceInUsdt = ethers.utils.formatUnits(balanceInWei, 6); // Convert to 6 decimal places
      return [userId, userid, walletAdyy, balanceInUsdt];
    });

    const balancesWithUsers = await Promise.all(balancePromises);

    // Convert the array of [userId, userid, walletAdyy, balance] entries into an object
    const balanceObject = balancesWithUsers.reduce((acc, [userId, userid, walletAdyy, balance]) => {
      acc[userId] = [userid, walletAdyy, balance];
      return acc;
    }, {});

    return balanceObject;
  } catch (error) {
    console.error('Error fetching USDT balances:', error);
    throw error;
  }
}


