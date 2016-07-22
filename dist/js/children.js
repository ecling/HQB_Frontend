$(document).ready(function(){
	$a = $(".navbar a");
	$a.eq(0).find("span").addClass('spancolor');
	$a.eq(0).css("marginTop","-70px");
	$ul = $(".wrap ul");
	$ul.eq(0).css('display', 'block');
	$a.on('click',animated);
	
	function animated(){
		$this = $(this);
		$this.animate({marginTop:'-70px'});
		$this.find("span").addClass('spancolor');
		$this.siblings("a").animate({marginTop:'0'});
		$this.siblings("a").find("span").removeClass('spancolor');
		$t = $this.index();
		$ul.css('display','none');
		$ul.eq($t).css('display', 'block');
	};	
});
