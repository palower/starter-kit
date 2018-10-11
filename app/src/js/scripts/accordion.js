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
