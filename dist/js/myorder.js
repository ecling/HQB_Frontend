jQuery(document).ready(function($) {
	$(".delete").on('click',function() {
		var Dthis = $(this);
		Dthis.parent("li").animate({"marginTop":"-700px",});
	});
	$("#copy_input").zclip({
        path: "dist/js/ZeroClipboard.swf",
        copy: function(){
        return $("#copytext").text();
        },
        afterCopy:function(){
            var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'> 复制成功</div></div>");
            $("body").find(".copy-tips").remove().end().append($copysuc);
            $(".copy-tips").fadeOut(2000);
        }
	});
});
