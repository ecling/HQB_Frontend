$(function(){
	$(".dropdown").dropDown();
	$(".menu").menu();
    $("#scrollToTop").scrollToTop();

	//Top Mini Cart
	(function(){
		var topCart = $(".cart");
        cart_dimmer = $().dimmer({
            contain: '.cart .drop_content'
        });
		topCart.on("mouseover",function(){
			if(!topCart.attr("data-load")){
			    cart_dimmer.showUp(); 
				$.ajax({
					type: "GET",
					url: "/cartremind/ajax/mini",
					dataType: "json",
					success: function(msg){
						//topCart.find('.qty').text(msg);
                        cart_dimmer.hideDown();
						topCart.children(".drop_content").html(msg);
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
                data: "q="+input.val(),
				type: "GET",
				url: "catalogsearch/ajax/suggest/",
				dataType: "html",
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
			$(".search_complete").html(msg);
		};
		var onkeyup = function(){
			if(!input.val().length>0){
				return;
			}
            console.log(is_load);
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
	//$("#newsletter").validate();
    var newsletterValidata = $("#newsletter").validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
            //error.appendTo(element.parent());
            element.parent().after(error);
        }
    });
    
    $("#newsletter button").click(function(event) {
        event.preventDefault();
        var form = $("#newsletter"),
            that = this;
        if (newsletterValidata.form()) {
            $(this).addClass('btn loading');
            $.ajax({
                url: form.attr('action'),
                type: 'POST',
                dataType: 'json',
                data: form.serialize(),
            })
            .done(function(data) {
                if (!data.error) {
                    newsletterValidata.resetForm();
                    form[0].reset();
                }
                notify(data.message);
            })
            .fail(function() {
                notify("something is wrong,try again");
            })
            .always(function() {
                jQuery(that).removeClass('btn loading');
            });
        }
    });
    
});	

function initData() {
    $('.shoppingCart input[type="checkbox"]').checkbox();
    $(".listQty").inputNum();
    var sub = $(".shoppingCart table input[type='checkbox']"),
        main = $(".shoppingCart .action input");
    BatchCheck(sub, main);
    $(".shoppingCart input[type='number']").each(function(index, el) {
        $(el).data('oldValue', el.value);
    });
}