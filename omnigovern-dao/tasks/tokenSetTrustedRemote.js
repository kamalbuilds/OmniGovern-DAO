const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function (taskArgs, hre) {
    const dstChainId = CHAIN_ID[taskArgs.targetNetwork];
    const dstAddr = getDeploymentAddresses(taskArgs.targetNetwork)["OmniGovernDAOToken"];

    // get local contract instance
    const TokenContract = await ethers.getContract("OmniGovernDAOToken");
    console.log(`[source] OmniGovernDAOToken.address: ${TokenContract.address}`);

    // Set trusted remote
    let tx = await (await TokenContract.setTrustedRemoteAddress(dstChainId, dstAddr)).wait()
    console.log(`✅ [${hre.network.name}] OmniGovernDAOToken.setTrustedRemoteAddress( ${dstChainId}, ${dstAddr} )`)
    console.log(`...tx: ${tx.transactionHash}`);

    // Wait for transactions
    console.log("Waiting for confirmations...");
    await ethers.provider.waitForTransaction(
        tx.transactionHash, 2
    );

    console.log(`OmniGovernDAOToken.getTrustedRemote( ${dstChainId} ): ${await TokenContract.getTrustedRemoteAddress(dstChainId)}`);
}
