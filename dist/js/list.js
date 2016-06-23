(function($){
	var Accordion = function(element){
		var dl = element.children("dl");
		dl.each(function(i){
			$(this).on("click",function(event){
				$(this).children("dd").slideUp("slow");
				$(this).siblings().slideToggle();
			});
		});
	};

	$.fn.accordion = function(){
		var accordion = Accordion(this);
	};
})(jQuery);