(function($){
		
})(jQuery);

$(function(){
	/*(function(){
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
	})();*/

	$(".clicked").on('click',show);
	$(".contentd a").on('click',show);
	$(".icon-xiugai").on('click',show);
	$(".new_address_a").on('click',show);
	$(".icon-close").on('click',hide);
	$("#submit").on('click',hide);
    $(".forgotten_password_button").on('click',show);
    $(".close_popup").on('click',hide);

    function show(){
    	$(".popup").show(500);
		$(".mask").css("height",$(document).height());     
        $(".mask").css("width",$(document).width());     
        $(".mask").show(500); 
    }
    function hide(){
    	$(".popup").hide(500);
		$(".mask").hide(500);
    }

    $(".conter_address_left .default").on('click',function(){
    	$this = $(this);
    	$this.addClass("defaultStyle").html("Make Default");
    	$this.parent(".conter_address_left").siblings().find(".default").html("Default").removeClass('defaultStyle'); 	
    });
    $(".conter_address_left .icon-shanchu").on('click',function(){
    	$this = $(this);
    	$this.parent(".conter_address_left").animate({"marginTop":"-2000px",}, 1000);
    });
});