# Blockchain Security
The following file explains how to setup and run code in this project for the Blockchain security challenge.

## Setup

### Requirements: 
- Node.js
- npm


## Task 2
1. Install dependencies:
    ```bash
    npm install
    ```

2. Compile the contract:
    ```bash
    npx hardhat compile
    ```

3. Run a local Ethereum network on the current terminal:
    ```bash
    npx hardhat node
    ```

4. In a new terminal (same project folder), deploy the contract:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

Expected output:
```bash
    Compiled 1 Solidity file successfully (evm target: paris).
    Contract deployed at: 0xABCDEF...
    File registered!
    File hash: Qm12345...
    File owner:  0xf39Fd6...
```

## Task 3
1. Run the ethereum network (if not done before)
    ```bash
    npx hardhat node --hostname 127.0.0.1
    ```

2. Deploy the contract (if not done before)
    ```bash
    npx hardhat run scripts/deploy.js --network localhost  
    ```

3. Copy the contract address from the terminal

4. Run the registerFile script
    ```bash
    npx hardhat run scripts/registerFile.js --network localhost    
    ```
5. Expected output:
   ```bash
    Deploying contracts with the account: 0xf39Fd6e...
    File Hash: cf39bea...
    File registered with ID: sample.txt
    Checking file with ID: sample.txt
    Stored File Hash: cf39bea...
    File integrity confirmed: The hash matches.
   ```

