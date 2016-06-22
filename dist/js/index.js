(function($){
	var Scroll = function(element,num,width){
		var ul = element.children("ul");
		var lists = ul.children("li");
		var list_width = 0;
		var totalWidth = 0;
		var left = 0;
		var init = function(){
			ul.wrap('<div class="temwap"></div>');
			var wap = element.children(".temwap");
			wap.css({"width":width,"overflow":"hidden","position":"relative"});
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
			//var left = ul.css("left");
			if(parseInt(left)==(-totalWidth+list_width*num)){
				left = 0;
			}else{
				left = parseInt(left)-list_width*num;
			}
			ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","transition":"all 800ms ease","transform":"translate3d("+left+"px, 0px, 0px)"});
		};
		var prev = function(){
			//var left = ul.css("left");
			if(parseInt(left)==0){
				left = -totalWidth+list_width*num;
			}else{
				left = parseInt(left)+list_width*num;
			}
			
			ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","transition":"all 800ms ease","transform":"translate3d("+left+"px, 0px, 0px)"});
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
	$.fn.scroll = function(num,width){
		var scroll = new Scroll(this,num,width);
	};
})(jQuery);

$(function(){
	$('.home_hot').scroll(3,849);
	$('.home_show').scroll(5,1200);
});