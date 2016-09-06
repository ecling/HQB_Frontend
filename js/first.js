(function($){
	var Accordion = function(element){
		var dl = element.children("dl");
		dl.each(function(i){
			$(this).on("click",function(event){
				$(this).children("dd").slideDown("slow");
				$(this).find(".iconfont").addClass('iconfontStyle');
				$(this).siblings(".list").children("dd").slideUp("slow");
				$(this).siblings(".list").find('.iconfont').removeClass('iconfontStyle');
			});
		});
	};

	$.fn.accordion = function(){
		var accordion = Accordion(this);
	};
})(jQuery);


$(function(){
    $(".product_list img").lazyLoadImg();
    $(".slider").slider();
    
    $(".shop_by").accordion();
    
    //quick view
    (function(){
        if ($(".quickView").length) {
            var allItemlen = jQuery('.product_list>li .p_quick_view'),
                quickIndex = 0,
                quickId = 0,
                quickData = [],
                dataXHR = null;
            allItemlen.each(function(index, el) {
                quickData.push($(el).attr('data-id'));
            });
            $('.quickView').delegate('.scrollBox li', 'click', function(event) {
                var divs = $('.scrollBox>div'),
                    lis = $('.scrollBox li');
                lis.removeClass('active');
                $(this).addClass('active');
                divs.hide().eq($(this).index()).show();
            });
            var dimmer = $().dimmer({
                contain: '.quickView .popUp'
            });
            
            var leng = $('.proImg').length,
                quickViewPop = $().popUp({
                    dimmer: '.quickView',
                    width: '928px',
                    height: '300px',
                    afterClose: function(){
                        $(".quickView .productCon").remove();
                        $('.quickView .popUp').css({
                            width: '928px',
                            height: '300px'
                        });
                        if (dataXHR) {
                            dataXHR.abort();
                        }
                    },
                    afterShow: function(){
                        
                    }
                });
            $('.p_quick_view').click(function(event) {
                /* Act on the event */
                event.preventDefault();
                index = $(this).parents('li').index(),
                quickId = $(this).attr('data-id');
                quickViewPop.showUp();
                quickInvoke(quickId, index);
            });
            var quickInvoke = function(id, index){
                dimmer.showUp();
                $.ajax({
                    url: '/catalog/product/ajax/id/' + id,
                    type: 'GET',
                    dataType: 'html',
                    xhr: function() {
                        var xhr = jQuery.ajaxSettings.xhr();
                        dataXHR = xhr;
                        return xhr;
                    }
                })
                .done(function(data){
                    dimmer.hideDown();
                    $(".quickView .productCon").remove();
                    $(".quickView .popInner").html(data);
                    initProFunc();
                    quickViewPop.setActualRect();
                    quickIndex = index;
                })
                .fail(function(){
                    dimmer.hideDown();
                })
                .always(function(){
                    
                });  
            };
            jQuery('.quickView .next').click(function(event) {
                if (quickIndex + 1 >= quickData.length) {
                    var index = 0;
                } else {
                    var index = quickIndex + 1;
                }
                quickInvoke(quickData[index], index);
            });
            jQuery('.quickView .prev').click(function(event) {
                if (quickIndex - 1 < 0) {
                    var index = quickData.length - 1;
                } else {
                    var index = quickIndex - 1;
                }
                quickInvoke(quickData[index], index);
            });
        }
    })();
     
});