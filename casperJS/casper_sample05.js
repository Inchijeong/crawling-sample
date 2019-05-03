var casper = require('casper').create();

var text = encodeURIComponent("9th Ward of New Orleans");
casper.start('https://www.google.com/maps/search/' + text, function(){
    if(this.exists('.section-hero-header-description div h1')){
      this.echo(this.getHTML('.section-hero-header-description div h1'));
    }
});

casper.run();