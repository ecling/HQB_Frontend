(function($){
	var Slider = function(element){		
		var ul = element.children(".carousel_main");
		var list  = ul.children("li");
		var list_num = list.length;
		var index = 0;
		var init = function(){
			element.append('<i class="prev iconfont icon-arrows-left"></i><i class="next iconfont icon-arrows-right"></i><div class="carousel_extra"><ul></ul></div>');
			extra_ul = $(".carousel_extra ul");
			list.each(function(i){
				extra_ul.append("<li></li>");
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
			//list.eq(index).show();
			list.eq(index).animate({opacity:'show'},1000);
			nav();
		};
		var prev = function(){
			list.eq(index).hide();
			if(index==0){
				index = list_num-1;				
			}else{
				index--;
			}
			list.eq(index).animate({opacity:'show'},1000);
			nav();
		};
		init();
		setInterval(next,5000);
		element.children(".next").on("click",function(){
			next();
		});
		element.children(".prev").on("click",function(){
			prev();
		});
		
	};
	var Tab = function(){

	};
	var EasyDialog = function(options){
		var container = options.container;
			content = options.container.content;
			header = options.container.header;
			autoClose = options.autoClose;
			//fixed = options.fixed;
			var open = function(){
				if(content){
					$("body").appendChild('<div class="dialogwrap"><div class="dialogcon"></div></div>');
					$("body").appendChild('<div class="dialoggb"></div>');
					$("dialogwrap").css({
						"margin":0,
						"padding":0,
						"border": 0,
						"width": "100%",
						"height": "100%",
						"position": "fixed",
						"left": 0,
						"top": 0
					});
					createHeader();
					createClose();
				}else{
					$(container).wrap('<div class="dialogbox"></div>');
					createClose();
				}
			};
			var createHeader = function(){

			};
			var createClose = function(){

			};
	};
	var SelectDrop = function(element,sl){
		var init = function(){
			element.each(function(i){
				var select_id = $(this).attr("id");
				$(this).before('<div class="'+select_id+' sel_container"><span></span><i class="iconfont icon-down"></i></div>');
				createOption(this);
			});
		};
		var createOption = function(select){
			var options = $(select).children('option');
			var select_id = $(select).attr("id");
			var select_value = $(select).val();
			$('.'+select_id).children("i").after('<div class="option"><ul></ul></div>');
			options.each(function(i){
				if($(this).attr("selected")){
					$('.'+select_id).children("span").text($(this).text());
				}else if(i==0){
					$('.'+select_id).children("span").text($(this).text());
				}
				$('.'+select_id).find("ul").append('<li date-value="'+$(this).attr('value')+'">'+$(this).text()+'</li>');
			});
		};
		var drop = function(){
			element.each(function(i){
				var select_id = $(this).attr("id");
				that = $(this);
				$('.'+select_id).on("click",function(){
					$(this).find('.option').toggle();
				});
				$('.'+select_id).find("li").each(function(i){
					$(this).on("click",function(){
						li_that = $(this);
						that.children("option").each(function(i){
							console.log(i);
							if(i==li_that.index()){
								$(this).attr('selected',true);
							}else{
								$(this).removeAttr("selected");
							}
						});
						$('.'+select_id).find("span").text($(this).text());
					});
				});
			});
		};
		init();
		drop();
	};
	$.fn.slider = function(){
		var slider = new Slider(this);
	};
	$.fn.easyDialog = function(options){
		var easyDialog = new EasyDialog(options);
	};
	$.fn.selectDrop = function(){
		var selectDrop = new SelectDrop(this);
	};
})(jQuery);

$(function(){
	$(".carousel").slider();
	$(".select_drop").selectDrop();
});

