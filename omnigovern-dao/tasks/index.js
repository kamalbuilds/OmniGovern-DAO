task("daoSetTrustedRemote",
    "Set up the trusted remote addresses for a DAO.",
    require("./daoSetTrustedRemote")
).addParam(
    "targetNetwork",
    "the targetNetwork to set as trusted"
);

task("tokenSetTrustedRemote",
    "Set up the trusted remote addresses for tokens.",
    require("./tokenSetTrustedRemote")
).addParam(
    "targetNetwork",
    "the targetNetwork to set as trusted"
);

task("satelliteSetTrustedRemote",
    "Set up the trusted remote addresses for a DAOSatellite.",
    require("./satelliteSetTrustedRemote")
);

task("readTokenData", 
    "Reads data about the OmniGovernDAOToken.",
    require("./readTokenData")
).addParam(
    "acc",
    "the account to read"
);

task("readDAOData", 
    "Reads data about the OmniGovernDAO.",
    require("./readDAOData")
).addParam(
    "acc",
    "the account to read"
);

task("readProposalData", 
    "Reads data about a proposal.",
    require("./readProposalData")
).addParam(
    "proposalid",
    "the proposalid to read"
);

task("readSatelliteData", 
    "Reads data about a proposal on the vote aggregator.",
    require("./readSatelliteData")
).addParam(
    "proposalid",
    "the proposalid to read"
);

task("delegateVotes",
    "Delegates token votes to an account.",
    require("./delegateVotes")
).addParam(
    "acc",
    "the account to delegate votes to"
);

task("newEmptyProposal",
    "Creates a new proposal on the hub chain.",
    require("./newEmptyProposal")
).addParam(
    "desc",
    "the description of the empty proposal"
);

task("execute",
    "Executes a proposal on the hub chain, generated from the empty proposal.",
    require("./executeProposal")
).addParam(
    "desc",
    "the description of the empty proposal"
);

task("vote",
    "Votes on a proposal.",
    require("./vote")
).addParam(
    "proposalid",
    "the id of the empty proposal"
).addParam(
    "support",
    "0 for con, 1 for pro"
)

task("hasVoted",
    "Whether or not an account has voted on a proposal.",
    require("./hasVoted")
).addParam(
    "proposalid",
    "the id of the empty proposal"
).addParam(
    "acc",
    "the account to query"
)

task("requestCollection",
    "A request to collect votes from satellite chains.",
    require("./requestCollection")
).addParam(
    "proposalid",
    "the id of the empty proposal"
)