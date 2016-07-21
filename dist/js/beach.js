$(document).ready(function(){
	$li = $(".navbar li");
	$ul = $(".liebiao ul");
	$ul.eq(0).css('display','block');
	$li.find('a').eq(0).css('background-position', '0 -136px');
	$li.on('click',function(){
		$this = $(this);
		$t = $this.index();
		$this.find('a').css('background-position', '0 -136px');
		$this.siblings('li').find('a').css('background-position', '0 0');
		$ul.css("display","none");
		$ul.eq($t).css("display","block");
	})
});
