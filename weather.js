var RSS = 'http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';

var parseString = require('xml2js').parseString;
var request = require('request');

request(RSS, function (err, response, body){
    if (!err && response.statusCode == 200){
        analyzeRSS(body);
    }
});

function analyzeRSS(xml){
    parseString(xml, function (err, obj){
        if (err){
            console.log(err);
            return;
        }
        console.log(JSON.stringify(obj, null, 2));
        var data = obj.rss.channel[0].item[0].description[0].body[0].location[0].data;
        var city = obj.rss.channel[0].item[0].description[0].body[0].location[0].city;

        for (var i in data){
            var datum = data[i];
            console.log(city + " " + datum.tmEf + " " + datum.wf + " " + datum.tmn + "~" + datum.tmx);
        }
    });
}
