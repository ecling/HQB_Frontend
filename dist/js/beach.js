$(document).ready(function(){
	$(function(){
        var _index=0;
        $("#navigationbar ul li").click(function(){
            $(this).addClass("beachStyle").siblings("li").removeClass("beachStyle");
            _index=$(this).index()+1;
            var _top=$("#louti"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        }); 
    });
		
});
