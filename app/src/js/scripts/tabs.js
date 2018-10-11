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
