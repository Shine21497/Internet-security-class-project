var express = require('express');
var router = express.Router();
var chain = require('../chain')
/* GET users listing. */
router.get('/querymap', function(req, res, next) {
    chain.Add("chain", {head_hash:"hajd", block_id:1008, time_stamp:"2019-08-09",  father_hash:"assad",  content:[{user_info:{userid:14523}, map_info:{province:"shanghai", region:"同济大学", name:"同济", map_file_location_encryption: "asdsad"}}]})
    matchres = []
    chain.All("chain").forEach(chain_item =>{
        chain_item.content.forEach(content_info => {
            console.log(content_info)
                if (content_info.map_info.province == req.query.province) {
                    if (content_info.map_info.region.indexOf(req.query.region) != -1) {
                        matchres.push(content_info.map_info)
                    }
                }
            }
        )
    });

    res.send(matchres);
});

router.get('/all', function(req, res, next) {
    chain.Add("chain", {head_hash:"hajd", block_id:1008, time_stamp:"2019-08-09",  father_hash:"assad",  content:[{user_info:{userid:14523}, map_info:{province:"shanghai", region:"同济大学", name:"同济", map_file_location_encryption: "asdsad"}}]})
    matchres = []
    chain.All("chain").forEach(chain_item =>{
        matchres.push(chain_item)
    });

    res.send(matchres);
});

module.exports = router;