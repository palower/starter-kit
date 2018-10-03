(function($) {
    $(document).ready(function(){
      
      $(".footer-col h4").click(function(){
        $(this).next("ul").toggle();
      });

      $(".carousel-slider").slick({
        dots: true

      });
    });
  })(jQuery);

