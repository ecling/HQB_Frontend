$(document).ready(function(){
	$li = $(".navbar li");
	$li.on('click',function(){
		$this = $(this);
		$this.find("img").attr("src","dist/images/nav_bg02.png");
		$this.siblings().find("img").attr("src","dist/images/nav_bg01.png");
	})
})