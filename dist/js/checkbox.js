jQuery(document).ready(function($) {
	$(".checkboxFive").on('click',function(){
		$(this).css({
			'background':'#e5941a',
			'border':'1px solid #e5941a',
		});
		$(this).find('.iconfont').css({
			'color':'white',
			'display':'block',
		});
	})
});