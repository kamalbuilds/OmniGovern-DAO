const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function (taskArgs, hre) {
    const dao = await ethers.getContract("OmniGovernDAO");

    console.log(`[source] OmniGovernDAO.address: ${dao.address}`);
    let spokeChainZero;
    try {
        spokeChainZero = await dao.spokeChains(0);
        console.log(`[source] OmniGovernDAO.spokeChains(0):`, spokeChainZero);
    }
    catch(e) {
        console.log(`[source] OmniGovernDAO.spokeChains ERROR!`);
        console.log(`[source]`, e);
    }

    try {
        const chainToQuery = spokeChainZero ?? 0;
        let addr = await dao.getTrustedRemoteAddress(chainToQuery);
        console.log(`[source] OmniGovernDAO.getTrustedRemoteAddress(${chainToQuery}):`, addr);
    }
    catch(e) {
        console.log(`[source] OmniGovernDAO.getTrustedRemoteAddress ERROR!`);
        console.log(`[source]`, e);
    }

}
