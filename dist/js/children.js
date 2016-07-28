$(document).ready(function(){
	$(function(){
        var _index=0;
        $(".gotop a").eq(0).addClass('navbarStyle');
        $(".gotop a").eq(4).siblings().click(function(){
            $(this).addClass("navbarStyle").siblings("a").removeClass("navbarStyle");
            _index=$(this).index()+1;
            var _top=$("#louti"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        });
        $(".gotop a").eq(4).click(function(){
            $("html,body").animate({scrollTop:0},500)
            $(".gotop a").removeClass("navbarStyle");
        });
    });
	$(window).scroll(function() {
        var leftValue = $(".wrap").get('0').getBoundingClientRect().top;
        if (leftValue<=0) {
            $(".navbar").css({
                "position":"absolute",
                "top":-leftValue,
                "left":"1120px",
            });
        }else{
            $(".navbar").css({
                "position":"absolute",
                  "left":"1120px",
                  "top":"70px",
            })
        }
    });
 

   window.onload = function(){
   	$(window).trigger("scroll");
   };
 

});
