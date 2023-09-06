// IPFS
import { encode as base64_encode } from 'base-64';
import { create as ipfsHttpClient } from 'ipfs-http-client';
let encodedSecrets = base64_encode(process.env.REACT_APP_IPFS_SECRET);

// Configuring IPFS
const ipfs = ipfsHttpClient({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    Authorization: 'Basic ' + encodedSecrets,
  },
});
export default ipfs;
