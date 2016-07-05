(function($){
	var DropDown = function(element){
		element.each(function(i){
			$(this).mouseenter (function(){
				$(this).addClass("active");
				$(this).find(".drop_content").show();
			});
			$(this).mouseleave (function(){
				$(this).removeClass("active");
				$(this).find(".drop_content").hide();
			});
		});
	};
	var Menu = function(element){
		var ul = element.find("ul");
		var li = element.find("li");
		var subs = element.find(".subNav");
		var is_active = false;
		var init = function(){
			subs.each(function(i){
				$(this).hide();
			});
			if($(element).hasClass("active")==true){
				is_active = true;
			}
		};
		init();
		li.each(function(i){
			$(this).on("mouseenter",function(event){
				ul.find(".active").removeClass("active");
				$(this).addClass("active");
				ul.find(".subNav").hide();
				$(this).find(".subNav").show();
			});
		});
		
		ul.on("mouseleave",function(){
			ul.find(".active").removeClass("active");
			subs.each(function(i){
				$(this).hide();
			});
		});

		if(is_active==false){
			element.on("mouseenter",function(event){
				element.css({"box-shadow": "0 2px 5px rgba(0, 0, 0, 0.3)"});
				element.children(".list").show();
			});
			element.on("mouseleave",function(event){
				element.css({"box-shadow": "none"});
				element.children(".list").hide();
			});
		}
	};

	$.fn.dropDown = function(){
		var dropDown = new DropDown(this);
	};
	$.fn.menu = function(){
		var menu = new Menu(this);
	};
})(jQuery);


$(function(){
	$(".dropdown").dropDown();
	$(".menu ").menu();

	//Top Mini Cart
	(function(){
		var topCart = $(".cart");
		topCart.on("mouseover",function(){
			if(!topCart.attr("data-load")){
				$.ajax({
					cache: false,
					type: "GET",
					url: "data-topcart.json",
					dataType: "json",
					success: function(msg){
						topCart.find('.qty').text(msg.qty);
						topCart.addClass("dropdown");
						topCart.dropDown();
						topCart.children(".drop_content").show();
						topCart.attr("data-load",true);
					}
				});
			}
		});
	})();

	//Auto Complete
	(function(){
		var input = $(".search-input input");
			is_load = false;
			t = '';
		var autoComplete = function(){
			$.ajax({
				cache: false,
				type: "GET",
				url: "data-autoComplete.json",
				dataType: "json",
				success: function(msg){
					show(msg);
					//console.log(msg);
				}
			});
		};
		var show = function(msg){
			if($(".search").length){
				$(".search").append('<div class="search_complete"></div>');
			}
			$(".search_complete").html(msg.html);
		};
		var onkeyup = function(){
			if(!input.val().length>0){
				return;
			}
			if(is_load){
				clearTimeout(t);
			}
			is_load = true;
			t =setTimeout(autoComplete,500);
		};
		var selectList = function(){

		};
		input.on("keyup",function(event){
			if(event.keyCode>=48&&event.keyCode<=57){
				onkeyup();
			}
			if(event.keyCode>=65&&event.keyCode<=90){
				onkeyup();
			}
			if(event.keyCode>=96&&event.keyCode<=105){
				onkeyup();
			}
			if(event.keyCode==8){
				onkeyup();
			}
			if(event.keyCode==38||event.keyCode==40){
				selectList();
			}
		});
		input.on("blur",function(event){
			$(".search_complete").css({
				"display": "none"
			});
		});
	})();

	//Newsletter form validate
	$("#newsletter").validate();
});	