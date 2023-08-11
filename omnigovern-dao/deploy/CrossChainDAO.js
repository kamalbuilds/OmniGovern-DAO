const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");
const CHAIN_IDS = require("../constants/chainIds.json");
const { getDeploymentAddresses } = require("../utils/readStatic");

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, getNetworkName } = deployments
    const { deployer } = await getNamedAccounts()

    const tokenAddr = getDeploymentAddresses(hre.network.name)["OmniGovernDAOToken"];
    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]

    if(tokenAddr == null) {
        throw new Error("OmniGovernDAOToken has not been deployed yet!");
    }


    // hub - moonbase
    const spokeChains = [ CHAIN_IDS["optimism-goerli"] ]// getNetworkName() == "moonbase" ? [ CHAIN_IDS["fantom-testnet"] ] : [];
    const args = [tokenAddr, lzEndpointAddress, spokeChains];

    console.log(`Deploying OmniGovernDAO on ${getNetworkName()} with ${deployer}...`);

    try {
        const deployment = await deploy("OmniGovernDAO", {
            from: deployer,
            args,
            log: true,
            waitConfirmations: 1,
        });


        // Wait for transactions
        console.log("Waiting for confirmations...");
        await ethers.provider.waitForTransaction(
            deployment.transactionHash, 2
        );

        // Attempt to verify
        // await hre.run("verify:verify", {
        //     address: deployment.address,
        //     constructorArguments: args,
        // });
        console.log("Verification should be complete.");
    }
    catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

module.exports.tags = ["OmniGovernDAO"]
