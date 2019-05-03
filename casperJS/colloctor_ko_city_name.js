var casper = require('casper').create();
var fs = require('fs');

var data = fs.read('city.json', 'utf8');
var list = JSON.parse(data);
console.log(list.length);
console.log(list[0].CityName);

var headerTitle = '.section-hero-header-description div h1';
// var headerSubTitle = '.section-hero-header-subtitle span';

casper.start().each(list, function(self, city){
    self.thenOpen('https://www.google.com/maps/search/'+city.CityName, function(){
        // console.log(self);
        // console.log(self.getCurrentUrl());
        if (self.exists(headerTitle)) {
            var koCityName = self.getHTML(headerTitle);
            
            self.echo(koCityName);
            check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            if(check.test(koCityName)){
                city.CityNameKO = koCityName;
            }else{
                city.CityNameKO = null;
            }
        }
        self.clearCache();
    });
});

casper.then(function(){
    fs.write('newCity.json', JSON.stringify(list), 'w');
});

casper.run();