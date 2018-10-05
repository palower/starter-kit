(function($) {
    $(document).ready(function(){
      
      $(".code-snippet-btn").click(function(){
        $(this).parent().next(".code-snippet").toggle();
        $(this).find("i").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");
      });

      $(".component-anchor").click(function(){
        var dNameObj = $("a[name='" + $(this).attr('data-name') + "']")
        $("html, body").animate({scrollTop: dNameObj.offset().top - 75}, 'slow');
      });

      $(".back-to-top").click(function(){
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
      });

    });
  })(jQuery);

