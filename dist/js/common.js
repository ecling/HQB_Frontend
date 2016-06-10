(function($){
	var DropDown = function(element){
		element.each(function(i){
			$(this).mouseenter (function(){
				$(this).find(".drop_content").slideDown("fast");
			});
			$(this).mouseleave (function(){
				$(this).find(".drop_content").slideUp("fast");
			});
		});
	};
	var Menu = function(){

	};
	var AutoComplete = function(){

	};
	var TopMiniCart = function(){
		
	};

	$.fn.dropDown = function(){
		var dropDown = new DropDown(this);
	};
})(jQuery);


$(function(){
	$(".dropdown").dropDown();
});	