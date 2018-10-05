//- check for mobile globally
var isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ? true : false;

(function($) {
  $(document).ready(function(){
      $(".footer-col h4").on("click touch", function(){
        $(this).next("ul").toggle();
      });

    });
  })(jQuery);


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

function setTabContentHeight(obj){
    $("ul.nav.nav-pills.nav-stacked").height(obj.height());
}
