import getConfig from '../config.js';
import { connect, Contract, WalletConnection } from 'near-api-js';

const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

// Initialize contract & set global variables
async function initContract() {
  // Set a connection to the NEAR network
  window.near = await connect(nearConfig);

  // Initialize a Wallet Object
  window.walletConnection = new WalletConnection(window.near);

  // Initialize a Contract Object (to interact with the contract)
  window.contract = await new Contract(
    window.walletConnection.account(), // user's account
    nearConfig.contractName, // contract's account
    {
      viewMethods: ['ft_metadata', 'ft_total_supply', 'ft_balance_of'],
      changeMethods: ['ft_mint', 'ft_burn', 'buy_course'],
    }
  );
}

function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

function login() {
  // Allows to make calls to the contract on the user's behalf.
  // Works by creating a new access key for the user's account
  // and storing the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName);
  // window.walletConnection.requestSignIn({
  //   contractId: 'ref-finance-101.testnet',
  //   methodNames: ['get_pools', 'get_pool_total_shares', 'get_deposits'],
  // });
}

async function fetchMetadata() {
  let response = await window.contract.ft_metadata();
  // return response;
}

async function paymentGateway(courseId, moduleIds, total_amount) {
  const args = {
    'courses': {
      [courseId] : moduleIds
    }
  }

  await window.contract.buy_course(
    args,
    '300000000000000', // attached GAS (optional)
    `${total_amount}`+'000000000000000000000000' // attached deposit in yoctoNEAR (optional)
  );
}

async function fetchTotalSupply() {
  let response = await window.contract.ft_total_supply();
  return response;
}

export {
  logout,
  login,
  fetchMetadata,
  fetchTotalSupply,
  initContract,
  paymentGateway,
};
