var casper = require('casper').create();

casper.start('https://www.google.com/maps/search/'+'seoul');

casper.wait(2000, function(){
    this.echo(this.getCurrentUrl());
});

casper.run();