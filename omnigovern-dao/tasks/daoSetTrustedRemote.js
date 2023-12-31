const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function (taskArgs, hre) {
    const dstChainId = CHAIN_ID[taskArgs.targetNetwork]
    const dstAddr = getDeploymentAddresses(taskArgs.targetNetwork)["DAOSatellite"]

    // get local contract instance
    const dao = await ethers.getContract("OmniGovernDAO");
    console.log(`[source] OmniGovernDAO.address: ${dao.address}`)

    let tx = await (await dao.setTrustedRemoteAddress(dstChainId, dstAddr)).wait()
    console.log(`✅ [${hre.network.name}] OmniGovernDAO.setTrustedRemoteAddress( ${dstChainId}, ${dstAddr} )`)
    console.log(`...tx: ${tx.transactionHash}`)
}



// HEY YOU YEAH YOU IN THE FUTURE

// CHECK THE FANTOM DAOSatellite TO SEE IF 
// PROPOSAL WAS RECEIVED PROPERLY