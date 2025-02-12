const fs = require('fs');
const crypto = require('crypto');
const hre  = require("hardhat");

const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    // Initialize Ethereum provider and signer
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Connect to the deployed contract
    const fileRegistry = await hre.ethers.getContractAt("FileRegistry", CONTRACT_ADDRESS);

    /*
    ---- c) Calling your smart contract to store (fileId, fileHash) on the blockchain. ----
    */

    // Read a local file
    const filePath = 'scripts/sample.txt';
    const fileBuffer = fs.readFileSync(filePath);

    // Compute the SHA-256 hash of the file
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex'); 
    console.log(`File Hash: ${fileHash}`);

    // Generate a fileId
    const fileId = filePath.split('/').pop();

    // Register the file's hash on the blockchain
    const tx = await fileRegistry.registerFile(fileId, fileHash);
    await tx.wait();
    console.log(`File registered with ID: ${fileId}`);

    console.log("Checking file with ID:", fileId);

    /*
    ---- d) (Optional) Retrieving the stored hash from the contract and comparing it locally to confirm integrity. ----
    */

    // Retrieve the file hash from the blockchain
    const storedHash = await fileRegistry.getFileHash(fileId);
    console.log(`Stored File Hash: ${storedHash}`);

    // Compare the local hash with the stored hash
    if (fileHash === storedHash) {
        console.log('File integrity confirmed: The hash matches.');
    } else {
        console.log('File integrity check failed: The hashes do not match.');
    }

    const owner = await fileRegistry.getFileOwner("file1");
    console.log(`File owner: `, owner);

}

// Run the main function
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
