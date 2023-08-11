const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function (taskArgs, hre) {
    const dao = await ethers.getContract("OmniGovernDAO");
    const proposalid = taskArgs.proposalid;

    console.log(`[source] OmniGovernDAOToken.address: ${dao.address}`);
    try {
        let spokeChainZero = await dao.spokeChains(0);
        console.log(`[source] OmniGovernDAOToken.proposalSnapshot():`, spokeChainZero);
    }
    catch(e) {
        console.log(`[source] OmniGovernDAOToken.spokeChains ERROR!`);
        console.log(`[source]`, e);
    }

}
