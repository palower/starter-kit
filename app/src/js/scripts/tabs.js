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
