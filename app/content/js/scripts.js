(function($) {
    $(document).ready(function(){
        $("a.accordion-button").on("click touch", function(){
            $(this).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
        });
    });

    //- use global function for getting query params 
    if(window.location.href.indexOf("?accordion") > -1){
        var acc = getQueryVal("accordion") - 1;
        $(".accordion-item").each(function(){
            $(this).find(".accordion-content").removeClass("in");
            $(this).find(".accordion-button i").removeClass("fa-minus").addClass("fa-plus");
            if($(this).index() == acc){
                $(this).find(".accordion-content").toggleClass("in");
                $(this).find(".accordion-button i")
                    .toggleClass("fa-minus")
                    .toggleClass("fa-plus");
            }
        });
    }
})(jQuery);

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
(function($) {
    $(document).ready(function(){

        if(typeof $(".carousel-slider").slick !== "undefined"){
            $(".carousel-slider").slick({
            dots: true
            });
        }

    });
  })(jQuery);


(function($) {
    $(document).ready(function(){
        if(!isMobile && $(".tabs-stacked")){
            setTabContentHeight($("#a"));
        }
        else{
            setTabContentHeight($(".tabs-stacked"), $("ul.nav-stacked").children().length);
        }
        $("ul.nav.nav-pills.nav-stacked li a").on("click touch", function(){
            event.preventDefault();
            $("ul.nav.nav-pills.nav-stacked li").removeClass("active");
            $(this).parent().addClass("active");

            $(".tab-content").hide();
            $($(this).attr("href")).show();

            if(!isMobile){
                setTabContentHeight($($(this).attr("href")));
            }
        })
    });
})(jQuery);

function setTabContentHeight(obj, numVal){
    if(numVal){
        var xHeight = $(".tabs-stacked ul.nav-stacked") + (numVal * $("ul.nav-stacked li").length - 1);
        $("ul.nav.nav-pills.nav-stacked").height(obj.height() + xHeight);
    }
    else{
        $("ul.nav.nav-pills.nav-stacked").height(obj.height());
    }
}
