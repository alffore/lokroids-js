/* https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js */

'use strict'

var os = require('os')
var ifaces = os.networkInterfaces()

var obtieneIP = function () {
  var miip = ''

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0

    ifaces[ifname].forEach(function (iface) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }

      if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
        //console.log(ifname + ':' + alias, iface.address)
      } else {
            // this interface has only one ipv4 adress
        //console.log(ifname, iface.address)
        miip = iface.address
        //return miip
      }
      ++alias
    })
  })
  return miip
}

module.exports = obtieneIP
