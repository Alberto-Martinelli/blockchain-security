// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileRegistry {
    struct File {
        string fileHash;
        address owner;
    }

    mapping(string => File) private files; // Like a python dictionary, maps a fileId to the File object

    event FileRegistered(string fileId, string fileHash, address indexed owner);
    /* 
        Events are a way for your smart contract to communicate that something of interest has happened on the blockchain. 
        When an event is emitted, it is logged in the transaction's log, which is a special data structure in the Ethereum 
        blockchain. This log can be accessed by external applications (like a frontend interface) to react to changes in the 
        contract state.
    */

    function registerFile(string memory fileId, string memory fileHash) public {
        require(bytes(files[fileId].fileHash).length == 0, "File already registered");
        files[fileId] = File(fileHash, msg.sender); // Creates a File object and save it in the dictionary
        emit FileRegistered(fileId, fileHash, msg.sender); // Triggers the event defined above.
    }

    function getFileHash(string memory fileId) public view returns (string memory) {
        require(bytes(files[fileId].fileHash).length > 0, "File not found");
        return files[fileId].fileHash;
    }

    function getFileOwner(string memory fileId) public view returns (address) {
        require(bytes(files[fileId].fileHash).length > 0, "File not found");
        return files[fileId].owner;
    }
    
}
