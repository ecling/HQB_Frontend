;
$(function() {

    /*navigator show sub list*/
    $('.hasSubNav').mouseenter(function(event) {
        $(this).find('.subNavigator').stop().slideDown('fast');
    }).mouseleave(function(event) {
        $(this).find('.subNavigator').stop().slideUp('fast');
    });

    /*ask question page*/
    $('.askQuestion .radio input').radio();

    /*ask question form validate*/
    $(".askQuestion form").validate({
        rules: {
            customer_name: "required",
            question_details: "required",
            customer_email: {
                required: true,
                email: true
            }
        },
        errorElement: "em",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    })

    /*login page*/
    $('.loginRegister input[type="checkbox"]').checkbox();

    /*user center page userSummary slidebox*/
    $('.userSummary+.commonSlide').scroll(4,210);

    /*user profile form validate*/
    if ($('.userProfile').length) {
        $('#form-email').validate({
            rules: {
                'email': {
                    required: true,
                    email: true
                },
                're-email': {
                    equalTo: '#email'
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },
            errorElement: 'em'
        })
        $('#form-password').validate({
            rules: {
                'current_password': 'required',
                'password': 'required',
                'confirmation': {
                    equalTo: '#password'
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },
            errorElement: 'em'
        })
    };


    /* user add new address */
    $("#country", "#region_id", "#region").selectUnio();

    $('.newAddress form').validate({
        rules: {
            'firstname': 'required',
            'lastname': 'required',
            'street[]': 'required',
            'postcode': 'required',
            'telephone': 'required',
            'city': 'required',
            'region_id': 'required',
            'region': 'required',
            'country_id': 'required'
        },
        errorElement: 'em',
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    })

    /*userNewsletter page*/
    $(".userNewsletter input[type='checkbox']").checkbox();
    var newsletterSub = $('.userNewsletter form div:last-of-type input'),
        newsletterMain = $('.userNewsletter form div:first-of-type input');
    BatchCheck(newsletterSub, newsletterMain);

    /*userCoupon page*/
    function Taps(taps, tapc) {
        var spans = $(taps).find('span'),
            contents = $(tapc);
        spans.each(function(index, el) {
            $(el).click(function(event) {
                spans.removeClass('active');
                $(this).addClass('active');
                if(contents.length>1) {
                    contents.hide();
                    contents.eq($(this).index()).show();
                }
            });
        });
    }
    if ($('.taps').length) {
        Taps('.taps', '.tapc');
        /*get coupons data asynchronously through Ajax*/
    }

    if ($('.userCoupon').length) {
        var dimmer = new Dimmer ({
            contain:'.userCoupon'
        });
        $('.taps span').each(function(index, el) {
            if($(el).hasClass('active')){
                $(el).addClass('loaded');
            }
            $(el).click(function(event) {
                var that = this;
                if (!$(this).hasClass('loaded')) {
                    dimmer.showUp();
                    $.ajax({
                        url: $(that).attr('data-url'),
                        type: 'GET',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        $(that).addClass('loaded');
                        $('.userCoupon .tapc').hide();
                        $(data).appendTo('.userCoupon').show();
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        dimmer.hideDown();
                    });
                } else {
                    $('.userCoupon .tapc').hide();
                    $('.userCoupon .tapc').eq($(this).index()).show();
                }
            });
        });
        $('.userCoupon').delegate('.pager li a', 'click', function(event) {
            event.preventDefault();
            dimmer.showUp();
            $.ajax({
                url: $(this).attr('href'),
                type: 'GET',
                dataType: 'json'
            })
            .done(function(data) {
                $('.userCoupon .tapc:visible').replaceWith($(data).css('display', 'block'));
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                dimmer.hideDown();
            });

        });
    }



    /*userProfile page*/
    $(".userProfile input[name='martial']").radio();
    $(".userProfile input[name='gender']").radio();

    /*userImg change*/
    var userImgFileInput = $('.userimg input[type="file"]'),
        mainImg = $('.userimg > div > img');
    $('.userimg >div .btn').click(function(event) {
        userImgFileInput.get(0).click();
    });
    userImgFileInput.change(function(event) {
        if (this.value && Modernizr.filereader) {
            var reader = new FileReader();
            reader.onload = function() {
                mainImg.attr('src', reader.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    /*login validate*/
    if ($('.signIn').length) {
        $('#login-form').validate({
            rules: {
                "login[username]": {
                    required: true,
                    email: true
                },
                "login[password]": "required"
            },
            errorElement: "em"
        })
    };
    if($('.NewAccount').length){ 
        $('#form-validate').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: "required",
                confirmation: {
                    equalTo: "#password"
                },
                agree: "required"
            },
            errorElement: "em",
            /*errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },*/
        })
    };
    /*update toshopcart when shopcartlist changed*/
    function updateTopShopCart() {
        $.ajax({
            url: '/checkout/cart/mini',
            type: 'GET',
            dataType: 'json'
        })
            .done(function(data) {
                $('.topCart .num').html(data.summery);
                $('.topCart span strong').eq(0).html(data.summery);
                $('.topCart span strong').eq(1).html($(data.subtotal));
                $('.topCart .topCartNav').attr('data-change', 'false').html($(data.html));
            })
            .fail(function() {
                notify('Sorry, something wrong, please try again.');
                console.log("error");
            })
            .always(function() {});

    }

    if ($('.items').length) {
        var changeHandler = undefined;

        function updateCart() {
            var dimmer = $().dimmer({
                contain: ".shoppingCart"
            });
            dimmer.showUp();
            $.ajax({
                url: "/checkout/cart/ajax",
                type: 'POST',
                dataType: 'json',
                data: $('.cart_left form').serialize(),
            })
                .done(function(data) {
                    dimmer.hideDown(function() {
                        $('.progress').remove();
                        $('.shoppingCart').replaceWith($(data));
                        initData(); // in common.js
                        dispatchMyEvent();
                        updateTopShopCart();

                    })
                })
                .fail(function() {
                    dimmer.hideDown(function() {
                        notify("Sorry, someting wrong, please try again", ".shoppingCart");
                    })
                    console.log("error");
                })
                .always(function() {
                });
        }

        function dispatchMyEvent() {

            /* product number change event*/
            $('.shoppingCart').delegate('.qty', 'change', function() {
                clearTimeout(changeHandler);
                var value = this.value,
                    that = this;
                changeHandler = setTimeout(function() {
                    if ((value - 0) && value != $(that).data('oldValue')) {
                        updateCart();
                    }
                }, 500)
            }).keyup(function(event) {
                var target = event.target;
                if (event.keyCode >= 96 && event.keyCode <= 105 || event.keyCode >= 48 && event.keyCode <= 57) {
                    $(this).data('oldValue', $(this).val())
                    $(target).trigger('change');
                }
            }).keydown(function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                }
            });
            $('.shoppingCart').delegate('.minus,.plus','click',function(){
                clearTimeout(changeHandler);
                changeHandler = setTimeout(function() {
                   updateCart(); 
                },500);
            });

            /*change the shipping cost when shipping method changes*/
            $('#co-shipping-method-form').delegate('', 'change', function() {
                var dimmer = $().dimmer({contain:'.estimate >div:last-of-type'});
                var form = $('#co-shipping-method-form');
                dimmer.showUp();
                $.ajax({
                    url: form.attr('action'),
                    type: 'POST',
                    dataType: 'json',
                    data:form.serialize()
                })
                .done(function(data) {
                    $('.estimate >div:last-of-type >p').remove();
                    $('.estimate .checkout').before($(data));
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    dimmer.hideDown();
                    console.log("complete");
                });

            });

            /* change the shipping methods when country changes*/
            $('#wrap .estimate').delegate('select', 'change', function() {
                var dimmer = new Dimmer({contain:'#co-shipping-method-form'});
                var form = $('#shipping-zip-form');
                dimmer.showUp();
                $.ajax({
                    url: form.attr('action'),
                    type: 'POST',
                    dataType: 'json',
                    data: form.serialize()
                })
                .done(function(data) {
                    if($('#co-shipping-method-form').length) {
                        $('#co-shipping-method-form').replaceWith(data);
                    } else {
                        form.after($(data));
                    }
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    dimmer.hideDown();
                    console.log("complete");
                });

            });
        }
        initData();
        dispatchMyEvent();

    };

    if ($('.orderTrack').length) {
        $("#login-form").validate({
            rules: {
                'login[username]': {
                    required: true,
                    email: true
                },
                'login[password]': 'required'
            },
            errorElement: 'em',
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            }
        });

        $("#oar_widget_orders_and_returns_form").validate({
            rules: {
                oar_email: {
                    required: true,
                    email: true
                },
                oar_order_id: 'required'
            },
            errorElement: 'em',
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            }
        })
    }
    if ($(".forgotPass").length) {
        $("#forgotpass").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            errorElement: 'em',
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            }
        })
    }



    if ($(".reviewList").length) {
        new ImagePreview('.reviewList');
    }
    /* paypal click count*/

    if ($(".paypal-logo").length) {
        $(".paypal-logo>a").click(function(event) {
            $.get('/firecheckout/analytics/paypal', function(data) {
            });
        });
    }

    /*contact us*/
    if ($(".contacts").length) {
        $("#contactForm").validate({
            rules: {
                name: "required",
                comment: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            errorElement: 'em',
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            }
        })
    }

    /*waterfall*/

    if ($(".waterfall").length) {
        $(".waterCon").waterfall({
            itemCls: 'fall',
            colWidth: 270,
            gutterWidth: 40,
            gutterHeight: 35,
            checkImagesLoaded: true,
            isAnimated: true,
            isFadeIn: false,
            align: 'left',
            dataType: 'html',
            animationOptions: {},
            path: function(page) {
                return '/detailedreview/share/ajax/p/' + page;
            }
        });

        $('.waterfall').delegate('i', 'click', function(event) {
            event.preventDefault();
            url = $(this).attr('href');
            var that = this;
            if (!$(this).hasClass('active')) {
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json'
                })
                    .done(function(data) {
                        if (data.error == false) {
                            $(that).addClass('active');
                            $(that).next('span').text(data['cont'])
                        }
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });
            }
        });
        $('.waterfall').delegate('.share a', 'click', function(event) {
            var href = $(this).attr('href');
            window.open(href,'','height=400,width=800,top=200,left=200,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
        });
    }

    /*happy hour*/
    if ($(".happyhour").length) {
        function happyInit() {
            $('.happyhour time').each(function(index, el) {
                $().countTimer(el,'{d} day(s) {h}:{m}:{s}');
            });
        }
        happyInit();

        $('.happyhour').delegate('ul:last-of-type .like a', 'click', function(event) {
            event.preventDefault();
            var url = $(this).attr('href'),
                that = this;
            if($(this).attr('data-pending')) {
                return false;
            }
            $(this).attr('data-pending', 'true');
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json'
            })
            .done(function(data) {
                $(that).next('span').text(data);
            })
            .fail(function() {
                $(that).removeAttr('data-pending');
                console.log("error");
            })
            .always(function() {
            });
        });
        $('.happyNav .switch a').click(function(event) {
            event.preventDefault();
            $('.happyNav .switch a').removeClass('active');
            $(this).addClass('active');
            var dimmer = new Dimmer({
                contain:'#todayDeal'
            });
            var id = $(this).attr('data-id');
            dimmer.showUp();
            $.ajax({
                url: '/flashsale/index/list',
                type: 'GET',
                dataType: 'json',
                data: {id: id},
            })
            .done(function(data) {
                $('#todayDeal').replaceWith($(data));
                happyInit();
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                dimmer.hideDown();
            });

        });
    }

})