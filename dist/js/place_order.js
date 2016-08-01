(function($){
		
})(jQuery);

$(function(){
	(function(){
		var fixContainer = $('.fixbox');
		var offset = fixContainer.offset();
		$(window).scroll(function(){
			var top = $(document).scrollTop();
			if(top-offset.top>0){
				fix_top = top-offset.top;
				$('.fixbox').css({'top':fix_top});
			}else{

			}
		});
		$("#commentForm").delegate('.payments button','click',function(){
			var top = $(document).scrollTop();
			if(top-offset.top>0){
				fix_top = top-offset.top;
				$('.fixbox').css({'top':fix_top});
			}
		});
	})();

	$(".clicked").on('click',show);
	$(".contentd a").on('click',show);
	$(".icon-close").on('click',hide);
	$("#submit").on('click',hide);
    

    function show(){
    	$(".popup").show();
		$(".mask").css("height",$(document).height());     
        $(".mask").css("width",$(document).width());     
        $(".mask").show(); 
    }
    function hide(){
    	$(".popup").hide();
		$(".mask").hide();
    }
});