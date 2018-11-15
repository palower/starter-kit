//- check for mobile globally
var isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ? true : false;

(function($) {
  $(document).ready(function(){
      $(".footer-col h4").on("click touch", function(){
        $(this).next("ul").toggle();
      });

    });
  })(jQuery);


//- get query string val
function getQueryVal(query){
  var url = new URLSearchParams(window.location.search);
  var param = url.get(query);
  return param;
}

//toggle plus-minus
function togglePlusMinus(obj){
  obj.find("i").toggleClass("fa-plus").toggleClass("fa-minus");
}