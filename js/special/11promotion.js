jQuery(function() {
    jQuery('.nav a').scrollTo(280);
    var navContain = jQuery('.navContain'),
        barHeight =  jQuery('.nav').height(),
        as = jQuery('.nav a');
    jQuery(window).scroll(function() {
        var navContainRect = navContain[0].getBoundingClientRect();
        if (navContainRect.top < 0) {
            navContain.find('.nav').css({
                position: 'fixed',
                top: '0px',
                zIndex: '2'
            });
            navContain.find('.backUp').addClass('active');
        }
        if (navContainRect.top >= 0) {
            navContain.find('.nav').css('position', 'static');
            navContain.find('.backUp').removeClass('active');
        }
        for (var i = as.length - 1; i >= 0; i--) {
            var aim = as.eq(i).attr('data-scroll'),
                dom = jQuery(aim).get(0);
            if (dom) {
                var rect = dom.getBoundingClientRect();
                if (barHeight < rect.bottom && rect.top <= barHeight) {
                    as.removeClass('active');
                    jQuery("a[data-scroll='" + aim + "']").addClass('active')
                }
            }
        };
    })

})