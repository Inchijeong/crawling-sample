phantom.casperPath = './node_modules/casperjs';
phantom.injectJs('./node_modules/casperjs/bin/bootstrap.js');
 
var fs = require('fs')
 
var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});
 
//open Facebook
casper.start().thenOpen("http://job.incruit.com/jobdb_list/advanced-search.asp", function() {
    console.log("jobkorea");
});
 
//로그인
casper.then(function(){
    console.log("해당 id와 pw로 로그인 합니다.");
    this.evaluate(function(){
    document.getElementById("ind1_list_16").click();
    document.getElementById("ind2_all_16").click();
    });
});
 
casper.then(function(){
    document.getElementById("detsearch").click();
});

//스크린샷 찍고 페이지 저장하기
casper.then(function(){
    console.log("3초 후에 AfterLogin.png 으로 저장됩니다.");
    this.wait(3000, function(){
      // After 6 seconds, this callback will be called, and then we will capture:
      this.capture('AfterLogin.png');
      fs.write("./hello.html", this.getHTML(), "w")
    });
});
/* 
//이미지 주소 받아오기
casper.then(function(){
    var images = this.evaluate(function(){
        var facebookImages = document.getElementsByTagName('img');
        var allSrc = [];
        for(var i = 0; i < facebookImages.length; i++) {
            if(facebookImages[i].height >= 100 && facebookImages[i].width >= 100)
                allSrc.push(facebookImages[i].src);
        }
        return JSON.stringify(allSrc);
    });
    console.log(images);
})
 */
casper.run();