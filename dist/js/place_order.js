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
});