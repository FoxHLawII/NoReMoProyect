var localtunnel = require('localtunnel');
localtunnel(9999, { subdomain: "unsubdominiorandom" }, function(err, tunnel) {
  console.log('LT running')
});