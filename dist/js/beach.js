$(document).ready(function(){
	$(function(){
        var _index=0;
        $("#navigationbar ul li").eq(0).addClass("beachStyle");
        $("#navigationbar ul li").click(function(){
            $(this).addClass("beachStyle").siblings("li").removeClass("beachStyle");
            _index=$(this).index()+1;
            var _top=$("#louti"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        }); 
        $("#navigationbar>a").click(function(){
            $("html,body").animate({scrollTop:0},500)
            $("#navigationbar ul li").removeClass("beachStyle");
        });
    });
	$(window).scroll(function() {
        var scrollHright = $(window).scrollTop();
        var windowWidth = $(window).width();
        var navbarWidth = $("#navigationbar").width();
        if (scrollHright>980) {
            $("#navigationbar").css({
                "position":"fixed",
                "top":"0",
                "left":(windowWidth-navbarWidth-90)+'px',
            });
        }else{
            $("#navigationbar").css({
                "position":"absolute",
                  "left":"1100px",
                  "top":"162px",
            })
        }
    });	
});
