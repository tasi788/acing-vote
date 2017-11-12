// ==UserScript==
// @name         aniti-acgn-vote
// @version      1.0
// @description  easy to vote
// @author       Juise
// @contributor  TDC
// @match        https://acgn-stock.com/*
// @grant        none
// ==/UserScript==

function addPluginMenu() {
  const pluginMenu = $(`
        <li class="nav-item">
          <a class="nav-link btn btn-primary" href="#" id="one-click">一鍵投票</a>
        </li>
        <li> <p>&nbsp</p></li>
        <li class="nav-item">
          <a class="nav-link btn btn-primary" href="#" id="block-vote">投票</a>
        </li>
        <li> <p>&nbsp</p></li>
        <li class="nav-item">
          <a class="nav-link btn btn-primary" href="#" id="text-Return">複製</a>
        </li>
      `).insertAfter($(".nav-item").last());
  pluginMenu.find("#one-click").on("click", oneClick);
  pluginMenu.find("#block-vote").on("click", blockVote);
  pluginMenu.find("#text-Return").on("click", textReturn);
}

function oneClick(){
	blockVote();
	setTimeout(function(){
        textReturn('one-click');}, 3000);
}

function openfolder() {
  var loadtext = $(".d-block.h4:eq(6)").text();
  if (loadtext == "")
  {
    setTimeout(function(){openfolder();}, 1000);
  }
  else
  {
    $(".d-block.h4:eq(3)").click();
    $(".d-block.h4:eq(6)").click();
    clearInterval();
  }

}

function blockVote() {
  $("button.btn.btn-primary.btn-sm:eq(0)").click();
}

function textReturn(from){
  var uname = document.getElementsByClassName("dropdown-toggle")[0].innerText.split(' ')[1];
  var subbutton = document.getElementById(from);
  var i = 0;
  while( i<10 ) {
    var text = document.getElementsByClassName("logData")[0].innerText;
    var suname = text.split(' ')[3];
    i++;
    if (uname == suname) {
      var copyThis = text;
      new Clipboard('.btn', {
        text: function(trigger) {
            return copyThis;
        }
      });
      subbutton.innerText = "已複製";
      setTimeout(function(){
        if (from == 'one-click'){
          subbutton.innerText = "一鍵投票";
          return;
        }
        subbutton.innerText = "複製";
      }, 3000);
      break;
    };
  };

  //alert('已複製到剪貼簿');
}

(function() {
  addPluginMenu();
  var script = document.createElement("SCRIPT");
  onload = openfolder();
  script.src = 'https://cdn.jsdelivr.net/npm/clipboard@1/dist/clipboard.min.js';
  script.type = 'text/javascript';
  script.onload = function() {
    var $ = window.jQuery;
  };
  document.getElementsByTagName("head")[0].appendChild(script);
})();
