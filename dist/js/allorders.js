jQuery(document).ready(function($) {
	var img = $(".products_show_img img");
	var next = $(".products>.icon-you");
	var pvre = $(".products>.icon-xiangzuo");
	index = img.index();
	next.on('click',function(){
		index++;
		img.hide();
		pvre.show();
		img.eq(index).show();
		if (index>=img.length-1) {
			next.hide();
		}
	});
	pvre.on('click',function(){
		index--;
		img.hide();
		next.show();
		img.eq(index).show();
		if (index<=0) {
			pvre.hide();
		}
	});
})