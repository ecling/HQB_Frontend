jQuery(document).ready(function($) {
	$(".clicked").on('click',show);
	$(".contentd a").on('click',show);
	$(".icon-close").on('click',hide);
	$("#submit").on('click',hide);
    

    function show(){
    	$(".shipping-address-form").show();
		$(".mask").css("height",$(document).height());     
        $(".mask").css("width",$(document).width());     
        $(".mask").show(); 
    }
    function hide(){
    	$(".shipping-address-form").hide();
		$(".mask").hide();
    }
});