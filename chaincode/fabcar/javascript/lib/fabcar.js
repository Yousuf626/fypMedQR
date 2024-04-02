/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

class FabCar extends Contract {

   async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');

    const records = [
        {
            hash: '3e23bf3d07ce58a8e2d08066a9fb8e2a3b6c1b6e8b57a6a7342a1b6d5a13f0d2',
            filename: 'health_report.pdf'
        },
        {
            hash: '4a23bf3d07ce58a8e2d08066a9fb8e2a3b6c1b6e8b57a6a7342a1b6d5a13f0d3',
            filename: 'health_report_2.pdf'
        },
        // add more records as needed
    ];

    for (let i = 0; i < records.length; i++) {
        await ctx.stub.putState(records[i].hash, Buffer.from(JSON.stringify({ filename: records[i].filename })));
        console.info('Added <--> ', records[i]);
    }

    console.info('============= END : Initialize Ledger ===========');
}


    
   
    async entryRecord(ctx, patientID, filename,contentType, length, data) {
        console.info('============= START : create record hash ===========');
    
        // Create a hash of the data
        const hash = crypto.createHash('sha256');
        hash.update(patientID + filename + contentType + length + data);
        const dataHash = hash.digest('hex');
    
        // Store the hash in the ledger
        await ctx.stub.putState(dataHash, Buffer.from(JSON.stringify({
            filename,
        })));
    
        console.info('============= END : create record hash ===========');
    }
    


    async queryHash(ctx, hash) { // Function to query a link by its name
        const hashAsBytes = await ctx.stub.getState(hash); // get the link from chaincode state
        if (!hashAsBytes || hashAsBytes.length === 0) {
            return 'no hash';
        }
        console.log(hashAsBytes.toString());
        return hashAsBytes.toString();
    }


}

module.exports = FabCar;