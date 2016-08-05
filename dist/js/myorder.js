jQuery(document).ready(function($) {
	var $li = $(".account_setting_tab li");
	var $div = $(".account_setting_conter>div");
	$li.on('click', function() {
		var $this = $(this);
		$li.removeClass('tab_style');
		$this.addClass('tab_style');
		$index = $this.index();
		$div.css('display','none');
		$div.eq($index).css('display','block');
	});
});