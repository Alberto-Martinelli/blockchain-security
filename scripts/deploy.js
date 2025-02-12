const hre = require("hardhat");

async function main() {
    const FileRegistry = await hre.ethers.getContractFactory("FileRegistry");
    const fileRegistry = await FileRegistry.deploy();

    await fileRegistry.waitForDeployment();
    console.log(`Contract deployed at: ${await fileRegistry.getAddress()}`);

    // Register a file
    const tx = await fileRegistry.registerFile("file1", "Qm12345...");
    await tx.wait(); // Wait for transaction confirmation
    console.log("File registered!");

    // Retrieve the file hash
    const fileHash = await fileRegistry.getFileHash("file1");
    console.log(`File hash: ${fileHash}`);

    const owner = await fileRegistry.getFileOwner("file1");
    console.log(`File owner: `, owner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
