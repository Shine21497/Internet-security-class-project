var express = require('express');
var router = express.Router();
var chain = require('../chain')
/* GET users listing. */
router.get('/querymap', function(req, res, next) {
    matchres = []
    allData = chain.All("mapInfo");
    if (allData != null){
        chain.All("mapInfo").forEach(chain_item =>{
            chain_item.content.forEach(content_info => {
                console.log(content_info)
                    if (content_info.map_info.province == req.query.province) {
                        if (content_info.map_info.region.indexOf(req.query.region) != -1) {
                            matchres.push(content_info.map_info);
                        }
                    }
                }
            )
        });
    }

    res.send(matchres);
});

router.get('/all', function(req, res, next) {
    matchres = []
    allData = chain.All("mapInfo")
    if (allData != null){
        chain.All("mapInfo").forEach(chain_item =>{
            matchres.push(chain_item)
        });
    }

    res.send(matchres);
});

module.exports = router;