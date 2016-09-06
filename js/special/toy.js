$(function(){
    side(".product>ul>li",".nav li");
    function side(ele,e){
        $(e).each(function(){
            var w=$(this).index();
            $(this).click(function(){
                var z=$(ele).eq(w).offset().top;
                $("body,html").animate({scrollTop:z},500);
            })
        });
    }
    $("#scrollToTop").scrollToTop();
    new DropDonw(".dropdown");
});