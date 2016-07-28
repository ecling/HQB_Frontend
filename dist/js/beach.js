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
      /*  var navigationbar = $("#navigationbar");
        var items = $(".item");
        var currentId = "";
        items.each(function(){
        var m = $(this);
        var top = $(document).scrollTop();
            if (top>m.offset().top) {
                currentId = "#" + m.attr("id");
                console.log(currentId);
            }else{
                 return false;
            }
         });
         var currentLink = navigationbar.find(".beachStyle");
            if (currentId && currentLink.attr("href") != currentId) {
                currentLink.removeClass("beachStyle");
                navigationbar.find("[href=" + currentId + "]").addClass("beachStyle");
            }*/
    });	
});






