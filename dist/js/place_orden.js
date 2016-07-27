jQuery(document).ready(function($) {
	$(".clicked").on('click',show);
	$(".contentd a").on('click',show);
	$(".icon-close").on('click',hide);
	$("#submit").on('click',hide);
    

    function show(){
    	$(".popup").show();
		$(".mask").css("height",$(document).height());     
        $(".mask").css("width",$(document).width());     
        $(".mask").show(); 
    }
    function hide(){
    	$(".popup").hide();
		$(".mask").hide();
    }
});