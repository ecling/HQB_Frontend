(function($){
	var Scroll = function(element){
		var ul = element.children("ul");
		var lists = ul.children("li");
		var list_width = 0;
		var totalWidth = 0;
		var init = function(){
			ul.wrap('<div class="temwap"></div>');
			var wap = element.children(".temwap");
			wap.css({"width":"849","overflow":"hidden","position":"relative"});
		};
		var ListWidth = function(){
			lists.each(function(i){
				if(i==0){
					list_width = $(this).outerWidth(true);
				}
				totalWidth = totalWidth+$(this).outerWidth(true);
			});
			ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","left":"0"});
		};
		var next = function(){
			var left = ul.css("left");
			if(parseInt(left)==(-totalWidth+list_width*3)){
				left = 0;
			}else{
				left = parseInt(left)-list_width*3;
			}
			ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","left":left});
		};
		var prev = function(){
			var left = ul.css("left");
			if(parseInt(left)==0){
				left = -totalWidth+list_width*3;
			}else{
				left = parseInt(left)+list_width*3;
			}
			
			ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","left":left});
		};
		init();
		ListWidth();
		element.children(".prev").on("click",function(){
			prev();
		});
		element.children(".next").on("click",function(){
			next();
		});
	};
	$.fn.scroll = function(){
		var scroll = new Scroll(this);
	};
})(jQuery);

$(function(){
	$('.scroll').scroll();
});