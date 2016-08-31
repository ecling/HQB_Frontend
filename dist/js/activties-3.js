jQuery(document).ready(function($) {
	$(window).scroll(function() {
		var navbar_top = $(".wrap").get('0').getBoundingClientRect().top;
		var navbar=$(".navbar");
		console.log(navbar_top);
		if(navbar_top<=0){
			navbar.css({
				"position": 'fixed',
				"top": '0',
				"left":"0",
				"zIndex":"1000",
			});
		}else{
			navbar.css({
				"position": 'static',		
			});
		}	
	});
	$(function(){
		var navbar_a=$(".navbar a");
		navbar_a.click(function(){
			var _index=0;
			$(this).addClass('active').siblings().removeClass('active');
            _index=$(this).index()+1;
            var _top=$("#itme"+_index).offset().top;
            $("body,html").animate({scrollTop:_top-86},500);
            console.log(_top);
        });
	});
});