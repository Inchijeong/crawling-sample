var casper = require('casper').create();

casper.start('https://www.naver.com', function () {
    
    this.fillSelectors('form#sform', {
        'input[name="query"]': '검색'
    })

    this.click('#search_btn');
});


casper.viewport(1400, 800);

casper.then(function () {
  this.capture('naver-capture.png',{
    top:0, left:0, width: 1400, height: 800
  });

});

casper.run();