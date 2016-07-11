'use strict';

let express = require('express');

let router = express.Router();
let request = require('request');


router.post('/', (req, res) => {
  console.log('req.body.symbol: ',req.body.symbol)
	request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${req.body.symbol}`, function(err, response, body) {
		if(err) return res.status(400).send(err);
		res.send(body);
	})
})


// router.get('/:symbol', (req, res) => {
//   console.log('req.params.symbol: ',req.params.symbol)
// 	request(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${req.params.symbol}`, function(err, response, body) {
// 		if(err) return res.status(400).send(err);
// 		res.send(body);
// 	})
// })

module.exports = router;
