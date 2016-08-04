jQuery(document).ready(function($) {
	var $li = $(".Account_Setting_tab li");
	var $div = $(".Account_Setting_conter>div");
	$li.on('click', function() {
		var $this = $(this);
		$index = $this.index();
		$div.css('display','none');
		$div.eq($index).css('display','block');
	});
});