const mongoose = require('mongoose');
const User = require('../models/patient'); // Assuming 'User' is your model
const { Wallets, Gateway } = require('fabric-network');
const { X509WalletMixin } = require('fabric-common');
const Admin = require('../models/admin');



async function getEmail(email) {
    try {
        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('User not found');
            return null;
        }

        // Return the email
        return user.email;
    } catch (error) {
        console.error(`Failed to fetch user: ${error}`);
        return null;
    }
}


async function getIdentity(eemail) {
    try {
        console.log("inside get identity")
        // Find user by email
        const user = await User.findOne({ email: eemail });
        if (user != null) {
            console.log('User already exist');
            return null;
        }
    } catch (error) {
        console.error(`Failed to fetch user: ${error}`);
        return null;
    }
}

// async function getAdminIdentity(admin_name) {
//     try {
//         // Check if collection exists
//         const collectionExists = await mongoose.connection.db.collection('admins').exists();

//         if (!collectionExists) {
//             console.log('Admin collection does not exist. Creating collection...');
//             await Admin.createCollection();
//         }
//         console.log("inside get identity")
//         // Find user by email
//         const user = await Admin.findOne({ email: admin_name });
//         if (!user) {
//             console.log('User not found');
//             return null;
//         }

//         // Create identity object
//         const identity = {
//             credentials: {
//                 certificate: user.credentials.certificate,
//                 privateKey: user.credentials.privateKey,
//             },
//             mspId: user.mspId,
//             type: user.type,
//         };

//         // Return the identity
//         return identity;
//     } catch (error) {
//         console.error(`Failed to fetch user: ${error}`);
//         return null;
//     }
// }





module.exports = {getEmail, getIdentity};
