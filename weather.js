var RSS = 'http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';

var parseString = require('xml2js').parseString;
var request = require('request');

request(RSS, function (err, response, body){
    if (!err && response.statusCode == 200){
        analyzeRSS(body);
        console.log("=====================================");
    }
});

function analyzeRSS(xml){
    parseString(xml, function (err, obj){
        if (err){
            console.log(err);
            return;
        }
        var data = obj.rss.channel[0].item[0].description[0].body[0].location[0].data;
        var city = obj.rss.channel[0].item[0].description[0].body[0].location[0].city;
        console.log(JSON.stringify(data, null, 2));

        for (var i in data){
            var datum = data[i];
            console.log(city + " " + datum.tmEf + " " + datum.wf + " " + datum.tmn + "~" + datum.tmx);
        }
    });
}


var client = require('cheerio-httpcli');

client.fetch(RSS, {}, function (err, $, res){
    if (err){
        console.log("error");
        return;
    }

    var city = $("location:nth-child(1) > city").text();
    $("location:nth-child(1) > data").each(function (idx){
        var tmEf = $(this).find('tmEf').text();
        var wf = $(this).find('wf').text();
        var tmn = $(this).find('tmn').text();
        var tmx = $(this).find('tmx').text();

        console.log(city + " " + tmEf + " " + wf + " " + tmn + "~" + tmx);
    });
});