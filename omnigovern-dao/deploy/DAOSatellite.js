const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");
const CHAIN_IDS = require("../constants/chainIds.json");
const TARGET_SECONDS_PER_BLOCK = require("../constants/targetSecondsPerBlock.json");
const { getDeploymentAddresses } = require("../utils/readStatic");

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, getNetworkName } = deployments
    const { deployer } = await getNamedAccounts()

    const voteToken = getDeploymentAddresses(hre.network.name)["OmniGovernDAOToken"];
    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]

    // NOTE:    change this based on the network you want to use, but since this tutorial is made for
    //          Moonbeam, the hub chain will always be Moonbeam / Moonbase Alpha
    const hubChain = CHAIN_IDS.moonbase;
    const args = [hubChain, lzEndpointAddress, voteToken, TARGET_SECONDS_PER_BLOCK[getNetworkName()]];

    console.log(`Deploying DAOSatellite on ${getNetworkName()} with ${deployer}...`);

    try {
        const deployment = await deploy("DAOSatellite", {
            from: deployer,
            args,
            log: true,
            waitConfirmations: 1,
            value: "500000000000000000"
        });

        // Wait for transactions
        console.log("Waiting for confirmations...");
        await ethers.provider.waitForTransaction(
            deployment.transactionHash, 2
        );

        // Attempt to verify
        await hre.run("verify:verify", {
            address: deployment.address,
            constructorArguments: args,
        });
        console.log("Verification should be complete.");
    }
    catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

module.exports.tags = ["DAOSatellite"]
