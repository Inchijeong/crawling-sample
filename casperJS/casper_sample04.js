var casper = require('casper').create();

casper.start();

var text = encodeURIComponent("9th Ward of New Orleans");
casper.open('https://www.google.com/maps/search/' + text);

casper.then(function(){
  console.log(this.exists('.section-hero-header-description div h1'));
  if(this.exists('.section-hero-header-description div h1')){
    this.echo(this.getHTML('.section-hero-header-description div h1'));
  }
});

casper.run();