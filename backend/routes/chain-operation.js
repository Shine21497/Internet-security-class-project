var fs = require('fs');
/* GET users listing. */

const sha256 = require('sha256');
var express = require('express');
var router = express.Router();
var chain = require('../chain')
/* GET users listing. */



function certificate(filename, hash){
    console.log('begin to read');
    var file_content = fs.readFileSync(filename, "utf8");
    console.log('file content is: ', file_content);

    var file_hash = sha256(file_content);
    return file_hash==hash;
}



router.get('/querymap', function(req, res, next) {
    matchres = []
    allData = chain.All("mapInfo");
    if (allData != null){
        chain.All("mapInfo").forEach(chain_item =>{
            chain_item.content.forEach(content_info => {
                console.log(content_info)
                path = content_info.map_info.map_file_location_encryption;
                hash = content_info.map_info.map_file_hash;
                console.log('path is: ', path);
                if (certificate(path, hash)){  
                    if (content_info.map_info.province == req.query.province) {
                            if (content_info.map_info.region.indexOf(req.query.region) != -1) {
                                matchres.push(content_info.map_info);
                            }
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