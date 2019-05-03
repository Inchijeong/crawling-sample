var casper = require('casper').create();
var fs = require('fs');

var text = encodeURIComponent("9th Ward of New Orleans");
var list;
var data = fs.read('city.json', 'utf8');
list = JSON.parse(data);
console.log(list[0].CityName);

casper.start('https://www.google.com/maps/search/' + list[0].CityName, function () {
  
  // this.fillSelectors('#searchbox_form', {
    //   'input[name="q"]': 'busan'
    // }, false);
});


// 화면 사이즈 설정
casper.viewport(1400, 800);

casper.then(function () {
 
  console.log(this.getCurrentUrl());

  this.capture('google-capture.png',{
    top:0, left:0, width: 1400, height: 800
  });

  if (this.exists('.section-hero-header-description div h1')) {
    this.echo(this.getHTML('.section-hero-header-description div h1'));
    // fs.write('title', this.getHTML('.section-hero-header-description div h1'), 'w');
  }

});

casper.run();