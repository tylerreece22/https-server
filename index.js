//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const http = require('http');
const https = require('https');
const fs = require('fs');
const key  = fs.readFileSync('server/privkey.pem', 'utf8');
const cert = fs.readFileSync('server/fullchain.pem', 'utf8');

const options = {key, cert};
const express = require('express');
const app = express();

app.post('/', (req,res) => {
console.log('post hit...')
return res.status(200).send('success')
})

app.get('/', (req,res) => {
console.log('get hit...')
return res.status(200).send('success')
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(8080, () => {console.log('http server lisening on 8080')});
httpsServer.listen(8443, () => {console.log('https server lisening on 8443')});
