var casper = require('casper').create();
var fs = require('fs');

var data = fs.read('newCity.json', 'utf8');
var list = JSON.parse(data);
var listLen = list.length;
console.log(listLen);
// console.log(list[0].CityName);

var headerTitle = '.section-hero-header-title';
var i = 0;

casper.start().each(list, function(self, city){
    if(!city.CityNameKO){
        self.thenOpen('https://www.google.com/maps/search/'+city.CityName, function(){
            // console.log(self.getCurrentUrl());
            i++;
            console.log('총 '+ listLen + '개 중에 ' +i+ '번째 진행 '+ parseInt((i/listLen) * 100) + '% ...');
            if (self.exists(headerTitle)) {
                var koCityName = self.getHTML(headerTitle);
                self.echo(koCityName);
                check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
                if(check.test(koCityName)){
                    city.CityNameKO = koCityName;
                }
            }
            if (i % 500 == 0){
                fs.write('newCity'+(i/500)+'.json', JSON.stringify(list), 'w');
            }
            if (i == listLen){
                fs.write('newCityFinal.json', JSON.stringify(list), 'w');
            }        
            self.clearCache();
        });
    }
});

// casper.then(function(){
    // fs.write('newCity.json', JSON.stringify(list), 'w');
// });

casper.run();