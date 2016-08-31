jQuery(document).ready(function($) {
	var bar = $(".navigationbar");
	var bar_li =$(".navigationbar li");
	$(window).scroll(function() {
		var bar_offsetTop = $(".activties_conter").get('0').getBoundingClientRect().top;
		if (bar_offsetTop<=0) {
			bar.css({
				"position":"absolute",
				"top":-(bar_offsetTop-100),
				"right":"-100px",
			});
		}else{
			bar.css({
				"position":"absolute",
				"top":"150px",
				"right":"-100px",
			});
		};
	});
	$(".gotop").on('click',goTop);
	function goTop(event){
		$("html,body").animate({scrollTop:0},500); 
		bar_li.removeClass('active');
	};
	$(function(){
		var _index=0;
		bar_li.click(function(){
			$(this).addClass('active').siblings().removeClass('active');
            _index=$(this).index()+1;
            var _top=$("#itme"+_index).offset().top;
            $("body,html").animate({scrollTop:_top},500);
        });
	});
});