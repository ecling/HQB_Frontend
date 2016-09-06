$(document).ready(function(){
	$(function(){
        var _index=0;
        $("#navigationbar ul li").click(function(){
            $(this).addClass("beachStyle").siblings("li").removeClass("beachStyle");
            _index=$(this).index()+1;
            var _top=$("#item"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        }); 
        $("#navigationbar>a").click(function(){
            $("html,body").animate({scrollTop:0},500);
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
    });	

    $(function(){
        var _index=0;
        $("#navigationbar_sexy a").click(function(){
            $(this).addClass("beachStyle").parent("li").siblings().find("a").removeClass("beachStyle");
            _index=$(this).parent("li").index()+1;
            var _top=$("#item"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        }); 
        $(".gotop").click(function(){
            $("html,body").animate({scrollTop:0},500);
            $("#navigationbar_sexy a").removeClass("beachStyle");
        });
    });
    $(window).scroll(function() {
        var leftValue = $('.wrap').get('0').getBoundingClientRect().top;
        if (leftValue<= 0) {
            $("#navigationbar_sexy").css({
                "position":"absolute",
                "top":-leftValue,
                "right":"-139px",
            });
        }else{
            $("#navigationbar_sexy").css({
                "position":"absolute",
                  "right":"-139px",
                  "top":"50px",
            })
        };
    }); 
});






