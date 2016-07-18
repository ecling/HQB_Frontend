(function($){
	var Accordion = function(element){
		var dl = element.children("dl");
		dl.each(function(i){
			$(this).on("click",function(event){
				$(this).children("dd").slideDown("slow");
				$(this).find(".iconfont").addClass('iconfontStyle');
				$(this).siblings(".list").children("dd").slideUp("slow");
				$(this).siblings(".list").find('.iconfont').removeClass('iconfontStyle');
			});
		});
	};

	$.fn.accordion = function(){
		var accordion = Accordion(this);
	};
})(jQuery);

$(function(){
	$(".shop_by").accordion();
});
jQuery(document).ready(function($) {
	$(".clearfix .icon-xin").on('click',function(){
		$(this).css("color","red");
	})
});