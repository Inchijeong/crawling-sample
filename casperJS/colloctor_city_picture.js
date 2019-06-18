var casper = require('casper').create();
var fs = require('fs');

var data = fs.read('city.json', 'utf8');
var list = JSON.parse(data);
var listLen = list.length;
console.log('listLen ', listLen);

var headerPicture = '.section-hero-header-hero';
var i = 0;

casper.start().each(list, function(self, city){
    if(!city.Picture){
        self.thenOpen('https://www.google.com/maps/search/'+city.CityName+', '+city.CountryName, function(){
            i++;
            console.log('총 '+ listLen + '개 중에 ' +i+ '번째 진행 '+ parseInt((i/listLen) * 100) + '% ...');

            if (self.exists(headerPicture)) {
                var pictureUrl = self.getElementsAttribute('.section-hero-header-hero img', 'src');
                self.echo(self.getCurrentUrl());
                self.echo(pictureUrl);

                var pictureName = city.CountryCode+'/'+city.CityName+'/'+city.CityName;
                // 프로퍼티 저장
                city.Picture = pictureName;

                this.download(pictureUrl, './picture/'+pictureName+'.jpg');

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

casper.run();