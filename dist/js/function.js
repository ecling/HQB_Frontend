(function($){
	var Slider = function(element){		
		var ul = element.children(".carousel_main");
		var list  = ul.children("li");
		var list_num = list.length;
		var index = 0;
		var init = function(){
			element.append('<div class="carousel_extra"><i class="prev">prev</i><i class="next">next</i><ul></ul></div>');
			extra_ul = $(".carousel_extra ul");
			list.each(function(i){
				extra_ul.append("<li>"+(i+1)+"</li>");
				if(i>0){
					$(this).hide();
				}
			});
			nav();
		};
		var nav = function(){
			extra_li = $(".carousel_extra ul").children();
			extra_li.each(function(i){
				if(i==index){
					$(this).addClass("active");
				}else{
					$(this).removeClass("active");
				}
			});
		};
		var next = function(){
			list.eq(index).hide();

			if(index==(list_num-1)){
				index = 0;
			}else{
				index++;
			}
			list.eq(index).show();
			nav();
		};
		var prev = function(){
			list.eq(index).hide();
			if(index==0){
				index = list_num-1;				
			}else{
				index--;
			}
			list.eq(index).show();
			nav();
		};
		init();
		$(".carousel_extra .next").on("click",function(){
			next();
		});
		$(".carousel_extra .prev").on("click",function(){
			prev();
		});
		
	};
	var Tab = function(){

	};
	var EasyDialog = function(){

	};
	$.fn.slider = function(){
		var slider = new Slider(this);
	};
})(jQuery);

$(function(){
	$(".carousel").slider();
});