const ethers = require('ethers');
const ropstenAddress = '0x17e59beDE7FeB4DfA0CDCb61601D3efBa7d074c8';
const kovanAddress = '0x39Ba0E94e9105aD6340819429BEE2ddc09ff8201';
const rinkebyAddress = '0xEB9703d83dDcdAb7d27bE80D528642B74ae4e369';

const executeDeposit = async (provider, amount, network, pubKey) => {
  const { contract, txCount, signer } = await instantiateContract(provider, pubKey, network);
  await executeTransaction(contract, amount, txCount, pubKey, provider, network);
  return contract;
};

const instantiateContract = async (provider, pubKey, network) => {
  const txCount = await provider.getTransactionCount(pubKey[0]);
  const abi = [{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_toChain","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"}],"name":"ContractCreation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_toChain","type":"uint256"}],"name":"Deposit","type":"event"}];
  const signer = provider.getSigner();
  let contract = new ethers.Contract('0x17e59beDE7FeB4DfA0CDCb61601D3efBa7d074c8', abi, signer);
  return { contract, txCount, signer };
};

const executeTransaction = async (contract, amount, txCount, pubKey, provider, network) => {
  const wei = ethers.utils.parseEther(amount);
  const overrideOptions = {
    gasLimit: 250000,
    gasPrice: 9000000000,
    nonce: txCount,
    value: wei,
  };
  let tx = await contract.functions.deposit(pubKey[0], 6284, overrideOptions);
  console.log({tx});
};

export default executeDeposit;

