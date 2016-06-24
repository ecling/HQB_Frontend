(function($){
	var FixedTab = function(tab,con,sec){
		var tab_height = $(tab).height();
		var scroll = function(){
			var tab_client = $(tab).get(0).getBoundingClientRect();
			var con_client = $(con).get(0).getBoundingClientRect();
			if(tab_client.top<=0){				
				$(tab).css({'position':'fixed','top':'0','z-index':10});
			}
			if(con_client.top>tab_height){
				$(tab).css({'position':'relative'});
			}
		};
		var tabtoggle = function(){
			tab_li = $(tab).find("li");
			tab_li.each(function(i){
				var id = $(this).find("a").attr("data-scroll");
				var con_client = $(id).get(0).getBoundingClientRect();
				if(con_client.top<=40&&con_client.bottom>0){
					$(this).find("a").addClass("active");
					$(this).siblings().find("a").removeClass("active");
				}
			});
		};

		var tabbind = function(){
			tab_li = $(tab).find("li");
			tab_li.each(function(i){
				$(this).find("a").on("click",function(event){
					event.preventDefault();
					var id = $(this).attr("data-scroll");
					$('body,html').animate({scrollTop:$(id).offset().top},500);
				});
			});
		}
		tabbind();
		$(window).scroll(function(){
			scroll();
			tabtoggle();
		});
	};
	$.fn.fixedtab = function(tab,Con,sec){
		var fixedtab = new FixedTab(tab,Con,sec);
	};
})(jQuery);

$(function(){
	$().fixedtab(".moreInfoBar",".moreInfoCon",".moreInfoSec");
});