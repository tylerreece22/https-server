//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';
const https = require('https')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const rp = require('request-promise-native');

const httpsAgent = new https.Agent({
  ca: fs.readFileSync(path.join(__dirname, 'client', 'my-private-root-ca.cert.pem')),
})

const instance = axios.create({httpsAgent})

axios({
  method: 'get',
  url: 'http://localhost:8080',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(() => {
console.log('http request successful')
}).catch((e) => {
console.log('http request rejected ' + e.message)
})

instance.get('https://localhost:8443').then(() => {
console.log('https get request successful')
}).catch((e) => {
console.log('https request rejected ' + e.message)
})

instance.post('https://localhost:8443').then(() => {
console.log('https post request successful')
}).catch((e) => {
console.log('https post request rejected ' + e.message)
})

var options = {
  host: 'localhost' 
, port: '8443' 
, path: '/'
, ca: fs.readFileSync(path.join(__dirname, 'client', 'my-private-root-ca.cert.pem'))
};
options.agent = new https.Agent({ca: fs.readFileSync(path.join(__dirname, 'client', 'my-private-root-ca.cert.pem'))});

https.request(options, function(res) {
  res.pipe(process.stdout);
}).end();

var options = {
    method: 'POST',
    uri: 'https://localhost:8443/',
    body: {
        some: 'payload'
    },
    json: true,
    agent: httpsAgent
};
 
rp(options)
    .then(function (parsedBody) {
	console.log('rp success')
    })
    .catch(function (err) {
	console.log('rp failed ' + err.message)
    });
