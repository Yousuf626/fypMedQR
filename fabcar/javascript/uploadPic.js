const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { getEmail, getIdentity } = require('./config/getUser');
async function upload(patientID, user_email,filename,contentType,length,data) {
    try {
        
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        console.log("inside upload function")
        

        //get walletobject from mongoDB
        const  ident = await getIdentity(user_email)
        if (!ident) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }



        // Create an in-memory wallet and import the identity into the wallet
        const wallet = await Wallets.newInMemoryWallet();
        await wallet.put(user_email, ident);

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_email, discovery: { enabled: true, asLocalhost: true } });
    
        

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

       // Submit the specified transaction (createLink).
        await contract.submitTransaction('entryRecord', patientID,filename,contentType,length,data);
        console.log('Link has been added to the ledger');

        

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
module.exports = upload;