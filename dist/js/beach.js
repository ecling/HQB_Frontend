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
        var leftValue = $('.liebiao').get('0').getBoundingClientRect().top;
        if (leftValue<= 0) {
            $("#navigationbar").css({
                "position":"absolute",
                "top":-leftValue,
                "left":"1080px",
            });
        }else{
            $("#navigationbar").css({
                "position":"absolute",
                  "left":"1080px",
                  "top":"162px",
            })
        };

        var luotiTop = $('#louti3').get('0').getBoundingClientRect().top;
        console.log(luotiTop);
        if (luotiTop <= 0) {
            $("#navigationbar ul li").removeClass("beachStyle");
            $("#navigationbar ul li").eq(2).addClass("beachStyle");
        }
    });	
});
