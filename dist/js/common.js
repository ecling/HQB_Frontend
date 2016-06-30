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

	//Top Mini Cart
	(function(){
		var topCart = $(".cart");
		topCart.on("mouseover",function(){
			if(!topCart.attr("data-load")){
				$.ajax({
					cache: false,
					type: "GET",
					url: "data-topcart.json",
					dataType: "json",
					success: function(msg){
						topCart.find('.qty').text(msg.qty);
						topCart.addClass("dropdown");
						topCart.dropDown();
						topCart.children(".drop_content").show();
						topCart.attr("data-load",true);
					}
				});
			}
		});
	})();

	//Auto Complete
	(function(){

	})();
});	