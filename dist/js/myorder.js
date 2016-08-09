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
	
	$(".delete").on('click',function() {
		var $this = $(this);
		$this.parent("li").animate({"marginTop":"-700px",},1000);
	});

	$("#copy_input").zclip({
        path: "dist/js/ZeroClipboard.swf",
        copy: function(){
        return $("#copytext").text();
        },
        afterCopy:function(){
            var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'> 复制成功</div></div>");
            $("body").find(".copy-tips").remove().end().append($copysuc);
            $(".copy-tips").fadeOut(3000);
        }
	});
		 
});