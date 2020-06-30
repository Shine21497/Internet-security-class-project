var fs = require('fs');
var express = require('express');
var router = express.Router();
var chain = require('../chain')
/* GET users listing. */
var multer = require('multer')

var upload = multer({ dest: 'uploads/' })
const sha256 = require('sha256');

// router.post('/upload', upload.array('file',1), (req, res) => {
// 	// res.json({
// 	// 	file: req.file
// 	// })
// 	res.json({
// 		msg: "上传成功"
// 	})
// });



router.post('/upload', upload.any(), function(req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息

    var des_file = "./uploads/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
                console.log( response );
                res.end( JSON.stringify( response ) );
            }
        });
    });
});


function saveChainInfo(chainInfo){
    chain.Add("mapInfo", chainInfo);
}


router.post('/new_map', (req, res) => {


    var mapInfo  = req.param('mapInfo');
    var userName = req.param('userName');
    

    //get time stamp
    var date = new Date().getTime().toString();

    var allChainInfo = chain.All("mapInfo");

    var father_hash = "";
    const hash_date = date;
    var head_hash = sha256(hash_date);
    var block_id = 1;

    if (allChainInfo == null){
    }else{
        block_id = allChainInfo.length+1;
        var lastElement = allChainInfo[allChainInfo.length-1]
        father_hash = lastElement.head_hash;
    }
    console.log('allChains: ', allChainInfo);


    //Load file and get the file hash
    var des_file = "./uploads/" + mapInfo.filename;
    var file_content = fs.readFileSync(des_file, "utf8");
    var file_hash = sha256(file_content);

    console.log('file hash is: ', file_hash);
    
    var chainInfo = {   
                    head_hash: head_hash, 
                    block_id: block_id,
                    time_stamp: date,
                    father_hash: father_hash,  
                    content:[
                        { user_info:{userName: userName,},
                          map_info:{province: mapInfo.province, 
                                    region: mapInfo.region, 
                                    name: mapInfo.name, 
                                    map_file_location_encryption: mapInfo.filename,
                                    map_file_hash: file_hash}}]};


    saveChainInfo(chainInfo);



    var data = {
        userName: userName,
        mapInfo: mapInfo,
    }


    return res.json(data).end();
});










module.exports = router;
