(function($){
	var Accordion = function(element){
		var dl = element.children("dl");
		dl.each(function(i){
			$(this).on("click",function(event){
				$(this).children("dd").toggle("slow");
				$(this).siblings(".list").children("dd").slideUp("slow");
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