var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.get('/', function(req, res){
var content;
  fs.readFile('output.json', function read(err, data) {
      if (err) {
          throw err;
      }
      content = JSON.parse(data);
      res.json(content)

  });

})



app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://nexterio.pl/szukaj.php?fraza=grohe&params=page:144';
var json = [];
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);


      var stock, product, url, id;

      var dump;

      $('.img').each(function(){
        var data = $(this);
        var url = 'https://nexterio.pl/' + data.children()[0].parent.attribs.href;
        var product = data.children()[0].parent.attribs.title;
        var id = data.children()[0].parent.attribs.href;
        id = id.split(',')[0];
        stock = 1;

        json.push({
          'url': url,
          'id': id,
          'product': product,
          'stock': stock})








    })


    }
url = 'https://nexterio.pl/szukaj.php?fraza=grohe&params=page%3A144&s=2';
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);


      var stock, product, url, id;

      var dump;

      $('.img').each(function(){
        var data = $(this);
        var url = 'https://nexterio.pl/' + data.children()[0].parent.attribs.href;
        var product = data.children()[0].parent.attribs.title;
        var id = data.children()[0].parent.attribs.href;
        id = id.split(',')[0];
        stock = 1;

        json.push({
          'url': url,
          'id': id,
          'product': product,
          'stock': stock})








    })


    }
  checkProduct();
  })
  })

var i = 0;
    function checkProduct(){
      var pid = json[i].id;
      setTimeout(function(){


        console.log(pid);
        request.post({
          url:     'https://nexterio.pl/',
          form:    { pid: pid, classID: 'KoszykKomponent', method:'checkProduct'}
        }, function(error, response, body){
          $ = cheerio.load(body, { xmlMode: true });
          console.log($("errorMessage").text());
          json[i].stock = $("errorMessage").text();

          if(i < json.length-1){
            i++;
            checkProduct();
          }
          else {
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
              console.log('File successfully written! - Check your project directory for the output.json file');
            })
          }

        });



      },100)

    }


    res.send('Check your console!')

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
