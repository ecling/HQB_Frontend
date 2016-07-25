$(document).ready(function(){
	$(function(){
        var _index=0;
        $(".navbar a").click(function(){
            $(this).addClass("navbarStyle").siblings("a").removeClass("navbarStyle");
            _index=$(this).index()+1;
            var _top=$("#louti"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        });
    });
});
