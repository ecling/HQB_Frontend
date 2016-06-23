(function($){
	var DropDown = function(element){
		element.each(function(i){
			$(this).mouseenter (function(){
				$(this).addClass("active");
				$(this).find(".drop_content").show();
			});
			$(this).mouseleave (function(){
				$(this).removeClass("active");
				$(this).find(".drop_content").hide();
			});
		});
	};
	var Menu = function(element){
		var ul = element.find("ul");
		var li = element.find("li");
		var subs = element.find(".subNav");
		var init = function(element){
			subs.each(function(i){
				$(this).hide();
			});
		};
		init();
		li.each(function(i){
			$(this).on("mouseenter",function(event){
				ul.find(".active").removeClass("active");
				$(this).addClass("active");
				ul.find(".subNav").hide();
				$(this).find(".subNav").show();
			});
		});
		ul.on("mouseleave",function(){
			ul.find(".active").removeClass("active");
			subs.each(function(i){
				$(this).hide();
			});
		});
	};
	var AutoComplete = function(){

	};
	var TopMiniCart = function(){
		
	};

	$.fn.dropDown = function(){
		var dropDown = new DropDown(this);
	};
	$.fn.menu = function(){
		var menu = new Menu(this);
	};
})(jQuery);


$(function(){
	$(".dropdown").dropDown();
	$(".menu ").menu();
});	