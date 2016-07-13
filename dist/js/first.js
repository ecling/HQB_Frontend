;
jQuery(function() {

    /*navigator show sub list*/
    jQuery('.hasSubNav').mouseenter(function(event) {
        jQuery(this).find('.subNavigator').stop().slideDown('fast');
    }).mouseleave(function(event) {
        jQuery(this).find('.subNavigator').stop().slideUp('fast');
    });

    jQuery('.currentCate .hasNav').click(function(event) {
        // event.preventDefault();
        event.stopPropagation();
        if (/li/i.test(event.target.tagName)) {
            if (jQuery(event.target).hasClass('expand')) {
                jQuery(this).removeClass('expand').children('ul').slideUp('fast');
            } else {
                jQuery(this).addClass('expand').children('ul').slideDown('fast');
            }
        }
    });

    new Checkbox(".listFilter input");

    if (jQuery(".slider").find('>a').length > 1) {
        jQuery('.slider').nivoSlider({
            effect: 'random'
        });
    }

    /*left aside slideup and slidedown*/
    jQuery('.filterOption h5').click(function(event) {
        var ul = jQuery(this).next('ul');
        if (ul.is(':hidden')) {
            ul.slideDown('fast');
            jQuery(this).removeClass('expand');
        } else {
            ul.slideUp('fast');
            jQuery(this).addClass('expand');
        }
    });

    /*lazy load images*/

    new LazyLoadImg(".listProduct img,.proLite img,.cataList img");

    if (jQuery(".quickView").length) {
        var allItemlen = jQuery('.listProduct>li .proImg span'),
            quickIndex = 0,
            quickId = 0,
            quickData = [],
            dataXHR = null;
        allItemlen.each(function(index, el) {
            quickData.push(jQuery(el).attr('data-id'));
        });
        jQuery('.quickView').delegate('.scrollBox li', 'click', function(event) {
            var divs = jQuery('.scrollBox>div'),
                lis = jQuery('.scrollBox li');
            lis.removeClass('active');
            jQuery(this).addClass('active');
            divs.hide().eq(jQuery(this).index()).show();
        });
        var dimmer = new Dimmer({
            contain: '.quickView .popUp'
        });
        var leng = jQuery('.proImg').length,
            quickViewPop = new PopUp({
                dimmer: '.quickView',
                width: '928px',
                height: '300px',
                afterClose: function() {
                    jQuery(".quickView .productCon").remove();
                    jQuery('.quickView .popUp').css({
                        width: '928px',
                        height: '300px'
                    });
                    if (dataXHR) {
                        dataXHR.abort();
                    }
                },
                afterShow: function() {
                    // quickViewPop.setActualRect();
                    // jQuery(".quickView .productCon").remove();
                }
            });
        jQuery('.proImg span').click(function(event) {
            /* Act on the event */
            event.preventDefault();
            index = jQuery(this).parents('li').index(),
            quickId = jQuery(this).attr('data-id');
            quickViewPop.showUp();
            quickInvoke(quickId, index);

        });

        function quickInvoke(id, index) {
            dimmer.showUp();
            jQuery.ajax({
                url: '/catalog/product/ajax/id/' + id,
                // url:'data.html',
                type: 'GET',
                dataType: 'html',
                xhr: function() {
                    var xhr = jQuery.ajaxSettings.xhr();
                    dataXHR = xhr;
                    return xhr;
                }
            })
                .done(function(data) {
                    dimmer.hideDown();
                    jQuery(".quickView .productCon").remove();
                    jQuery(".quickView .popInner").html(data);
                    initProFunc();
                    quickViewPop.setActualRect();
                    quickIndex = index;
                    console.log("success");
                })
                .fail(function() {
                    dimmer.hideDown();
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }
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

    /*new arrival category list*/
    if (jQuery(".catList").length) {
        jQuery('.catList li').mouseenter(function(event) {
            jQuery(this).addClass('active').find('.subList').slideDown('fast');
        }).mouseleave(function(event) {
            jQuery(this).removeClass('active').find('.subList').slideUp('fast');
        });
    }

    /*new arrival calendar control*/
    if (jQuery(".calendar").length) {
        var initialData = window.location.search.match(/date=(\d+-\d+-\d+)/);

        function getAllDays(DateObj) {
            var curMonth = DateObj.getMonth();
            DateObj.setMonth(curMonth + 1);
            DateObj.setDate(0);
            return DateObj.getDate();
        }

        function buildCalendar(year, month, contain, defaultDate) {
            var date = new Date(String(year) + " " + String(month) + " 1"),
                firstDay = date.getDay(),
                days = getAllDays(date),
                cdays = days + firstDay,
                today = new Date().getDate(),
                toMonth = new Date().getMonth();
            contain.innerHTML = "";
            baseUrl = contain.getAttribute('data-url');
            for (var i = 0, index = 1; i < cdays; i++) {
                var a = document.createElement('a');
                if (i < firstDay) {
                    a.innerHTML = '&nbsp;';
                } else {
                    if (index <= days) {
                        a.setAttribute('data-date', year + '-' + month + "-" + index);
                        a.innerHTML = index;
                        if (!defaultDate) {
                            if (index === today && month - 1 === toMonth) { // highlighte today
                                a.className = 'active';
                            }
                            if (index === 1 && month - 1 !== toMonth) {
                                a.className = 'active';
                            }
                        } else {
                            if (a.getAttribute('data-date') === defaultDate) {
                                a.className = 'active';
                            }
                        }
                        if (index > today && month - 1 === toMonth) {
                            a.className = 'notAllow';
                        } else {
                            a.href = baseUrl.replace(/\d+-\d+/, year + '-' + month + "-" + index);
                        }
                        index++;

                    } else {
                        break;
                    }
                }
                contain.appendChild(a);
            };
        }
        jQuery('.calendar .switch span').click(function(event) {
            jQuery(this).addClass('active').siblings().removeClass('active');
            var dateStr = jQuery(this).attr('data-date').split('-');
            if (initialData && initialData[1].split('-')[1] === dateStr[1]) {
                buildCalendar(dateStr[0], dateStr[1], jQuery('.calendar .main div')[0], initialData[1]);
            } else {
                buildCalendar(dateStr[0], dateStr[1], jQuery('.calendar .main div')[0]);
            }
        });
        jQuery('.calendar .main div').delegate('a', 'click', function(event) {
            if (!jQuery(this).hasClass('notAllow')) {
                window.localStorage['calendar'] = jQuery(this).attr('data-date');
                jQuery(this).addClass('active').siblings('a').removeClass('active');
            }
        });
        /*initialize calendar show*/
        if (initialData) {
            var dateStr = initialData[1].split('-');
            buildCalendar(dateStr[0], dateStr[1], jQuery('.calendar .main div')[0], initialData[1]);
            jQuery('.calendar .switch span').removeClass('active').each(function(index, el) {
                if (jQuery(el).attr('data-date') === dateStr[0] + "-" + dateStr[1]) {
                    jQuery(el).addClass('active');
                }
            });
            jQuery('.calendar .main a').removeClass('active').each(function(index, el) {
                if (jQuery(el).attr('data-date') === initialData[1]) {
                    jQuery(el).addClass('active');
                } else {
                    jQuery(el).removeClass('active');

                }
            });
        } else {
            jQuery('.calendar .switch span').eq(1).trigger('click');
        }
    }
})