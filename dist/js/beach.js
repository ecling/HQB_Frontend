$(document).ready(function(){
	$li = $(".navbar li");
	$ul = $(".liebiao ul");
	$ul.eq(0).css('display','block');
	$li.find('a').addClass('abackground2');
	$li.find('a').eq(0).addClass('abackground1');
	$li.on('click',function(){
		$this = $(this);
		$t = $this.index();
		$this.find('a').addClass('abackground1');
		$this.siblings('li').find('a').removeClass('abackground1');
		$ul.css("display","none");
		$ul.eq($t).css("display","block");
	})
});
