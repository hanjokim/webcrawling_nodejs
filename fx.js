var API = 'http://api.aoikujira.com/kawase/get.php?code=USD&format=json';

var request = require('request');
var fs = require('fs');

request(API, function (err, response, body){
    if (err || response.statusCode !== 200){
        console.log("ERROR", err);
        return;
    }

    var r = JSON.parse(body);
    // console.log(JSON.stringify(r, null, 2));
    var krw = r['KRW'];

    var t = new Date();
    var fname = "USD_KRW_" + t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDay() + '.txt';
    var text = '1USD=' + krw + 'KRW';
    console.log(text);
    fs.writeFile(fname, text);
});