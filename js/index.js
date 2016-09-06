(function($){
	var ScrollBOX = function(element,num,width){
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
			if(Modernizr.csstransforms3d){
				ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","transition":"all 800ms ease","transform":"translate3d("+left+"px, 0px, 0px)"});
			}else{
				ul.animate({"width":totalWidth,"overflow":"hidden","position":"relative","left":left});
			}
		};
		var prev = function(){
			//var left = ul.css("left");
			if(parseInt(left)==0){
				left = -totalWidth+list_width*num;
			}else{
				left = parseInt(left)+list_width*num;
			}
			
			if(Modernizr.csstransforms3d){
				ul.css({"width":totalWidth,"overflow":"hidden","position":"relative","transition":"all 800ms ease","transform":"translate3d("+left+"px, 0px, 0px)"});
			}else{
				ul.animate({"width":totalWidth,"overflow":"hidden","position":"relative","left":left});
			}
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
	$.fn.scrollBox = function(num,width){
		var scroll = new ScrollBOX(this,num,width);
	};


})(jQuery);

$(function(){
    $(".carousel").slider();
    $(".select_drop").selectDrop();
    $('.hot').scrollBox(3,933);
	$('.new').scrollBox(3,933);
	$('.home_show').scrollBox(5,1200);
    
    //up scroll
	(function(){
		var height = $('.cate_promotion').children('.wrap').height();
			ul_height = $('.cate_promotion').find('ul').eq(0).height();
			ul_num = $('.cate_promotion').find('ul').length;
			index = 0;
			wrap = $('.cate_promotion .wrap');
		var init = function(){
			wrap.css({"height":height});
		};
		var next = function(){
			index++;
			if(index>=ul_num){
				index = 0;
			}
            $(".cate_recommend").find('li').eq(index).addClass('active').siblings('li').removeClass('active');
			wrap_top = ul_height*index;
			if(Modernizr.csstransforms3d){
				wrap.css({"transition":"all 800ms ease","transform":"translatey(-"+wrap_top+"px)"});
			}else{
				wrap.animate({"top":"-"+wrap_top+"px"});
			}
		};
		init();
		t = setInterval(next, 5000);
		$('.home_cate').on("mouseleave",function(event){
			t = setInterval(next, 5000);
		});
		$('.home_cate').on("mouseenter",function(event){
			clearTimeout(t);
		});
		$('.cate_recommend').find('li').each(function(i){
			$(this).on("mouseenter",function(event){
				if(index!=$(this).index()){
					index = $(this).index();
					wrap_top = ul_height*index;
                    $(".cate_recommend").find('li').eq(index).addClass('active').siblings('li').removeClass('active');
					if(Modernizr.csstransforms3d){
						wrap.css({"transition":"all 800ms ease","transform":"translatey(-"+wrap_top+"px)"});
					}else{
						wrap.animate({"top":"-"+wrap_top+"px"});
					}
				}
			});
		});
	})();

	//home hot new tab
	(function(){
		var li = $('.home_hot .title li');
		var nav = function(num){
			li.each(function(i){
				if(num==i){
					$(this).addClass('active');
				}else{
					$(this).removeClass('active');
				}
			});
		};
		li.each(function(i){
			$(this).on("click",function(event){
				if(!$(this).hasClass('active')){
					if(i==0){
						$('.new').hide();
						$('.hot').animate({opacity:'show'},1000);
					}else{
						$('.hot').hide();
						$('.new').animate({opacity:'show'},1000);
					}
					nav(i);
				}
				return false;
			});
		});
	})();
    
    /*
	$().easyDialog({
		"container":{
			"content":"test test test test",
			"header":"message"
		},
		"autoClose":200
	});
	*/
});