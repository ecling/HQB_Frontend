(function($){
    var UpdateCartUser = function(){
      $.ajax({
        type:"POST",
        url:"/common/ajax/index",
        dataType:"json",
        success:function(msg){
            $('.topCart .num').text(msg.cart.count);
            num_item = $('.topCart').children().find('span').eq(1);
            num_item.children().eq(0).text(msg.cart.count);
            num_item.children().eq(1).text(msg.cart.subtotal);
            
            if(msg.user.is_login){
                $('.toolkit').children().eq(0).html(msg.user.name);
                list = $('.toolkit').children().eq(1).children('ul');
                if(list.children().length<5){
                    list.append(msg.user.logout);
                }
            }else{
                $('.toolkit').children().eq(0).html(msg.user.signin);
                list = $('.toolkit').children().eq(1).children('ul').children();
                if(list.length>4){
                    list.last().remove();
                }
            }
        }
      });  
    };
    $.fn.updateCartUser = function(){
		var updateCartUser = new UpdateCartUser(this);
	};
})(jQuery);

$(function(){
    $().updateCartUser();        
});