const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getEmail, getIdentity } = require('./config/getUser');

async function getPicture(patientID, filename, contentType, length, data, user_email) {
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



        const hash = crypto.createHash('sha256');
        hash.update(patientID + filename + contentType + length + data);
        const dataHash = hash.digest('hex');
    

        // Evaluate the specified transaction (queryLink).
        const result = await contract.evaluateTransaction('queryHash', dataHash);
        if(result != 'no hash'){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
module.exports = getPicture;