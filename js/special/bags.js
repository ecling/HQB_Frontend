jQuery(function(){
	jQuery('.switch div').click(function(event) {
		jQuery('.switch div').removeClass('active');
		jQuery(this).addClass('active')
		var index = jQuery(this).index();
		jQuery('.switchCon').hide().eq(index).show();
	});
})