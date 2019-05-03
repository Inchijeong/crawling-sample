//CasperJS 객체 생성
var casper = require('casper').create();

// CasperJS처리 시작
casper.start();

// 화면 사이즈 설정
casper.viewport(1400, 800);

// UserAgent 설정
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');

// 강아지로 검색
var text = encodeURIComponent("강아지");
casper.open('https://www.google.co.kr/search?q=' + text);

// 화면 캡쳐---- (¦4)
casper.then(function(){
  this.capture('google-capture.png',{
    top:0, left:0, width: 1400, height: 800
  });
});

// 실행개시
casper.run();