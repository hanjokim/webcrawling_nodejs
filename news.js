var fs = require('fs');
var cheerio = require('cheerio');

var xml = fs.readFileSync("nocutnews.xml", "utf-8");
console.log(xml);

$ = cheerio.load(xml, {xmlMode: true});

$("item").each(function (i, el){
    var title = $(this).children('title').text();
    var desc = $(this).children('description').text();
    console.log(title);
    console.log(desc);
    console.log("=============================");
});