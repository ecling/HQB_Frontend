jQuery(function() {

    function countTimerSp(select) {
        var dom = jQuery(select),
            limittime = Number(dom.attr('data-time')),
            offtime = 1;
        var limiter = setInterval(function() {
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;
            if (limittime > 0) {
                day = Math.floor(limittime / (60 * 60 * 24 * offtime));
                hour = Math.floor(limittime / (60 * 60 * offtime)) - (day * 24);
                minute = Math.floor(limittime / (60 * offtime)) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(limittime / offtime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            } else {
                clearInterval(limiter);
                dom.css('visibility', 'hidden');
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            if (day <= 9) day = '0' + day;

            var format = "<strong>{d1}</strong><strong>{d2}</strong>d<strong>{h1}</strong><strong>{h2}</strong>h<strong>{m1}</strong><strong>{m2}</strong>m<strong>{s1}</strong><strong>{s2}</strong>s";
            day = day + ''.split('');
            hour = hour + ''.split('');
            minute = minute + ''.split('');
            second = second + ''.split('');
            var content = format.format({
                d1: day[0],
                d2: day[1],
                h1: hour[0],
                h2: hour[1],
                m1: minute[0],
                m2: minute[1],
                s1: second[0],
                s2: second[1]
            })
            dom.html(content)
            limittime -= offtime;
        }, 1000);
    }

    jQuery('.nav a').scrollTo(40);
    new countTimerSp('.promotion time');

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