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
    var copyName = req.files[0].path.toString();
    copyName = copyName.replace('\\','/')
    copyName = './'+copyName
    console.log('Copy Name is: ', copyName);


    var des_file = "./uploads/" + req.files[0].originalname;
    fs.readFile( copyName, function (err, data) {
        fs.writeFile(copyName, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:copyName
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

function todayTime() {
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth() + 1;
    var curDate = date.getDate();
    if(curMonth<10){
            curMonth = '0' + curMonth;
    }
    if(curDate<10){
            curDate = '0' + curDate;
    }    
    var curHours = date.getHours();
    if(curHours<10){
        curHours = '0' + curHours;
    }    
    var curMinutes = date.getMinutes();
    if (curMinutes<10){
        curMinutes = '0' + curMinutes;
    }
    var curtime = curYear + '.' + curMonth + '.' + curDate +'  ' + curHours + ':' + curMinutes;
    return curtime;
}



function saveChainInfo(chainInfo){
    console.log('Finish certification');
    chain.Add("mapInfo", chainInfo);
}

router.post('/new_map', (req, res) => {


    var mapInfo  = req.param('mapInfo');
    var userName = req.param('userName');
    

    //get time stamp
    var time_stamp = todayTime();
    console.log("time_stamp is: " , time_stamp);
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
    var des_file = mapInfo.filename;
    console.log('des_filename is: ', des_file);
    var file_content = fs.readFileSync(des_file, "utf8");
    var file_hash = sha256(file_content);

    console.log('file hash is: ', file_hash);
    
    var chainInfo = {   
                    head_hash: head_hash, 
                    block_id: block_id,
                    time_stamp: time_stamp,
                    father_hash: father_hash,  
                    content:[
                        { user_info:{userName: userName,},
                          map_info:{province: mapInfo.province, 
                                    region: mapInfo.region, 
                                    name: mapInfo.name, 
                                    map_file_location_encryption: mapInfo.filename,
                                    map_file_hash: file_hash}}]};

    
    setTimeout(saveChainInfo,10000, chainInfo);
    // saveChainInfo(chainInfo);



    var data = {
        userName: userName,
        mapInfo: mapInfo,
    }


    return res.json(data).end();
});


function certificate(filename, hash){
    console.log('begin to read');
    var file_content = fs.readFileSync(filename, "utf8");
    console.log('file content is: ', file_content);

    var file_hash = sha256(file_content);
    return file_hash==hash;
}

router.post('/get_map', (req, res) => {

    var userName  = req.param('userName');
    
    
    var allChainInfo = chain.All("mapInfo");
    var lastResult = []
    if (allChainInfo != null){
        for (i = 0; i < allChainInfo.length; i++) { 
            var content = allChainInfo[i].content[0];
            var contentUserName = content.user_info.userName;
            
            var contentMapInfo = content.map_info;
    
            if (contentUserName == userName){
                path = contentMapInfo.map_file_location_encryption;
                hash = contentMapInfo.map_file_hash;
                console.log('path is: ', path);
                if (certificate(path, hash)){    
                    mapInfo = {
                        province: contentMapInfo.province,
                        region: contentMapInfo.region,
                        name: contentMapInfo.name,
                        date: allChainInfo[i].time_stamp,
                    };
                    lastResult.push(mapInfo);
                }
            }
         }    
    }
    
    return res.json(lastResult).end();
});








module.exports = router;
