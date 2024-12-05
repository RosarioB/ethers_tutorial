import { ethers, formatUnits } from "ethers";
import {
  formatEther,
  parseEther,
  Contract,
  Wallet,
  JsonRpcProvider,
} from "ethers";
import WETH_ABI from "./abis/weth.json" with  {type: "json" };
import "dotenv/config";

const ACCOUNT = "0x1F0c72E13718D9136FfE51b89289b239A1BcfE28";
const WETH_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000006";

const main = async () => {
  const provider = new JsonRpcProvider(process.env.RPC_URL);
  const signer = new Wallet(process.env.PRIVATE_KEY, provider);

  /* const blockNumber = await provider.getBlockNumber();
  console.log(`The actual block number is: ${blockNumber}`);

  const balance = await provider.getBalance(ACCOUNT);
  console.log(
    `The balance of the ${ACCOUNT} is: ${formatEther(balance)} Ether`
  ); */

  // When sending a transaction, the value is in wei, so parseEther
  // converts ether to wei.
  /* const tx = await signer.sendTransaction({
    to: "0x350a97Aa777CcfE518197C34342C5bA262825B35",
    value: parseEther("0.0001"),
  });
  const receipt = await tx.wait();
  console.log(`The traansaction receipt is: ${receipt.hash}`); */

  const wethContract = new Contract(WETH_CONTRACT_ADDRESS, WETH_ABI, provider);

  /* const tx = await signer.sendTransaction({
    data: wethContract.interface.encodeFunctionData("deposit"),
    value: parseEther("0.0001"),
    from: signer.address,
    to: WETH_CONTRACT_ADDRESS,
  });

  const receipt = await tx.wait();
  console.log(`The traansaction receipt is: ${receipt.hash}`); */

  const symbol = await wethContract.symbol();
  console.log(`The symbol of the token is: ${symbol}`);

  const decimals = await wethContract.decimals();
  console.log(`The decimals of the token is: ${decimals}`);

  // Read the token balance for an account
  const balance = await wethContract.balanceOf(ACCOUNT);
  console.log(
    `The balance of the ${ACCOUNT} is: ${formatEther(balance)} Ether`
  );

  console.log(
    `The balance of the ${ACCOUNT} is: ${formatUnits(balance, decimals)} Ether`
  );
};

main();
