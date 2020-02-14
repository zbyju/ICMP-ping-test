const express = require('express')
const router = express.Router()
const Ping = require('ping-wrapper')
const ipRegex = require('ip-regex');

Ping.configure();

router.get('/', (req, res) => {
    //Default ping to host '1.1.1.1', can be changed by query string to any host ip address (not domain name!)
    let host = '1.1.1.1';
    if(req.query.host && ipRegex({exact: true}).test(req.query.host)) {
        host = req.query.host
    }

    //Start ping
    let ping = new Ping(host)
    
    //If the ping takes too long, it timesout
    let timeout = setTimeout(() => { 
        ping.stop()
        result = { msg:'timeout', time:-1 }
        res.json(result)
        //console.log('timeout')
    }, 3000);

    ping.on('ping', function(data){
        ping.stop()
        clearTimeout(timeout)
        result = { msg:'reachable', host, time:data.time }
        res.json(result)
        //console.log('reachable - ' + result.time + 'ms')
    })
    ping.on('fail', function(data){
        ping.stop()
        clearTimeout(timeout)
        result = { msg:'unreachable', host, time:data.time }
        res.json(result)
        //console.log('unreachable')
    })
})

module.exports = router;