async function getDisplay() {
    const {createAlchemyWeb3} = require('@alch/alchemy-web3');
    console.log('here')
    //foo is now loaded.
    const fs = require('fs');

    const web3 = createAlchemyWeb3("https://eth-ropsten.alchemyapi.io/v2/I5JUCv3BNNmG_wucOnY6Yb8LZZzustVj");

    const tokenAddresses = [
        '0xf0A7c125E049537a8810A552eC139cb83DF9b9c6',
    ];
    const myAddress = '0x20871A76d30Cb57b14CFE10249a107A367CAc8F5';
    const myNFTContractJson = fs.readFileSync('./nftToken.json');
    const myNFTContractABI = JSON.parse(myNFTContractJson);
    let urilist = []
    for (let tokenAddress of tokenAddresses) {

        const contract = new web3.eth.Contract(myNFTContractABI, tokenAddress);
        const tokenURI = await contract.methods.tokenURI(1).call();
        urilist.push(tokenURI)
    }
    return urilist
}
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express')
const app = express()
const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get('/', function(req, res) {
    // Your function to be called goes here.
    getDisplay().then(result => {
        // do some processing of result into finalData
        // console.log(result)
        res.send(result);
    }).catch(err => {
        console.log(err);
        res.sendStatus(501);
    });
    // tokenURIList = getDisplay()
    // console.log(tokenURIList)
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });