$(document).ready(function(){
	$a = $(".navbar a");
	$a.eq(0).find("span").css("color","#febe2f");
	$a.eq(0).css("marginTop","-70px");
	$a.on('click',animated);
	function animated(){
		$this = $(this);
		$this.animate({marginTop:'-70px'});
		$this.find("span").css("color","#febe2f");
		$this.siblings("a").animate({marginTop:'0'});
		$this.siblings("a").find("span").css("color","#434343");
	};	
});