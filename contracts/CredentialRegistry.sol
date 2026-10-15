// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CredentialRegistry {
    struct Credential {
        address issuer;
        address holder;
        string ipfsHash;
        uint256 issuedAt;
        bool revoked;
    }

    mapping(bytes32 => Credential) public credentials;
    mapping(address => bool) public authorizedIssuers;

    event CredentialIssued(bytes32 indexed id, address issuer, address holder);
    event CredentialRevoked(bytes32 indexed id, address issuer);

    modifier onlyIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized");
        _;
    }

    function setIssuer(address issuer, bool status) external {
        authorizedIssuers[issuer] = status;
    }

    function issueCredential(
        bytes32 id,
        address holder,
        string memory ipfsHash
    ) external onlyIssuer {
        require(credentials[id].issuedAt == 0, "Already exists");
        credentials[id] = Credential({
            issuer: msg.sender,
            holder: holder,
            ipfsHash: ipfsHash,
            issuedAt: block.timestamp,
            revoked: false
        });
        emit CredentialIssued(id, msg.sender, holder);
    }

    function revokeCredential(bytes32 id) external onlyIssuer {
        require(credentials[id].issuer == msg.sender, "Not issuer");
        credentials[id].revoked = true;
        emit CredentialRevoked(id, msg.sender);
    }

    function verifyCredential(bytes32 id) external view returns (bool) {
        return credentials[id].issuedAt > 0 && !credentials[id].revoked;
    }
}