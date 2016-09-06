;
jQuery(function() {
    /*checkout page*/
    function initCurrentPageData() {
        $('.checkInfo input').radio();
        $('.checkShipMethod input[type="radio"]').radio();
        $('.checkShipMethod input[type="checkbox"]').checkbox();
    }

    initCurrentPageData();

    if (!jQuery('.checkInfo').hasClass('checkNew')) {
        addressValidateDataInit();
        var popAddress = $().popUp({
            handler: '.checkInfo .btno',
            dimmer: '.checkInfoPop',
            afterShow: function() {
                addressValidateDataInit();
            }
        });

        jQuery('.checkInfo .btno').click(function(event) {
            addressEdit = 0;
        });
    }

    /*need to add the first address*/
    if (jQuery('.checkNew').length) {
        $("[name='billing[country_id]']").selectUnio("[name='billing[region_id]']", "[name='billing[region]']");
    }

    /* modify the exist address*/
    jQuery(".checkInfo").delegate('label a', 'click', function(event) {
        event.preventDefault();
        var id = jQuery(this).prev('input').val();
        jQuery.ajax({
            url: '/customer/ajaxad/edit',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            }
        })
            .done(function(data) {
                if (data.error) {
                    notify(data.message);
                    return false;
                }
                jQuery(".checkInfoPop .popInner form").replaceWith(jQuery(data));
                popAddress.showUp();
                addressEdit = id;
                console.log("success");
            })
            .fail(function() {
                notify('Sorry, something wrong, please try again.', '.checkInfo');
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });

    /*switch exist address*/
    jQuery(".checkInfo").delegate('label input', 'change', function(event) {
        shipChange();
    })
    /*address form  validate and select contry unicom*/
    function addressValidateDataInit(postId) {
        /*checkout country unicom*/
        $("#country").selectUnio("#region_id", "#region");
        jQuery('#firecheckout-address').validate({
            rules: {
                'firstname': "required",
                'lastname': "required",
                'email': {
                    required: true,
                    email: true
                },
                'street[]': "required",
                'city': "required",
                'country_id': "required",
                'region_id': "required",
                'region': "required",
                'postcode': "required",
                'telephone': "required"
            },
            errorElement: "p",
            /*
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());

            },
            */
            showErrors: function() {
                this.defaultShowErrors();
                popAddress.setActualRect();
            },
            submitHandler: function(form) {
                var serialize = jQuery(form).serialize() + "&id=" + addressEdit;
                jQuery.ajax({
                    url: '/customer/ajaxad/post',
                    type: 'POST',
                    dataType: 'json',
                    data: serialize
                })
                    .done(function(data) {
                        if (data.error) {
                            notify(data.message);
                            return false;
                        }
                        jQuery('.checkInfo label').remove();
                        jQuery(data).insertBefore('.checkInfo .btno');
                        popAddress.hideDown();
                        initCurrentPageData();
                        shipChange();
                    })
                    .fail(function() {
                        notify('Sorry, something wrong, please try again.');
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });

            }
        })
    }
    /*change the every thing on checkout page when country changes*/
    function countryChange() {
        jQuery("#update_shipping").val(0);
        var methodDimmer = $().dimmer({
                contain: '.shippingOptions'
            }),
            payableDimmer = $().dimmer({
                contain: '.checkPayable'
            });
        methodDimmer.showUp();
        payableDimmer.showUp();
        jQuery.ajax({
            url: '/firecheckout/index/updateCheckout/',
            type: 'POST',
            dataType: 'json',
            data: jQuery("#firecheckout-form").serialize(),
        })
            .done(function(data) {
                console.log(data)
                if (data.error) {
                    notify(data.message);
                    return false;
                }
                if (data['update_section']['payment-method']) {
                    jQuery(".checkPayMethod>div").replaceWith(jQuery(data['update_section']['payment-method']));
                }
                if (data['update_section']['review']) {
                    payableDimmer.hideDown(function() {
                        jQuery(".fixbox").html(jQuery(data['update_section']['review']));
                    })
                }
                if (data['update_section']['coupon-discount']) {
                    jQuery("#firecheckout-form section").eq(1).replaceWith(jQuery(data['update_section']['coupon-discount']));
                }
                if (data['update_section']['shipping-method']) {
                    methodDimmer.hideDown(function() {
                        console.log(jQuery(data['update_section']['shipping-method']));
                        jQuery(".shippingOptions ul").html(jQuery(data['update_section']['shipping-method']));
                        initCurrentPageData();
                    })
                }

            })
            .fail(function() {
                methodDimmer.hideDown();
                payableDimmer.hideDown();
                notify('Sorry, something wrong, please try again.');
                console.log("error");
            })
            .always(function() {});

    }
    /*change the shipping method */
    function shipChange(that) {
        jQuery("#update_shipping").val(1);
        var payableDimmer = $().dimmer({
            contain: '.checkPayable'
        });
        payableDimmer.showUp();
        jQuery.ajax({
            url: '/firecheckout/index/updateCheckout/',
            type: 'POST',
            dataType: 'json',
            data: jQuery("#firecheckout-form").serialize(),
        })
            .done(function(data) {
                if (data.error) {
                    notify(data.message);
                    return false;
                }
                if (data['update_section']['payment-method']) {
                    jQuery(".checkPayMethod >div").replaceWith(jQuery(data['update_section']['payment-method']));
                }
                if (data['update_section']['review']) {
                    payableDimmer.hideDown(function() {
                        jQuery(".fixbox").html(jQuery(data['update_section']['review']));
                    })
                }
                if (data['update_section']['coupon-discount']) {
                    jQuery("#firecheckout-form section").eq(1).find('div').replaceWith(jQuery(data['update_section']['coupon-discount']));
                }
                if (data['update_section']['shipping-method']) {
                    jQuery(".shippingOptions ul").html(jQuery(data['update_section']['shipping-method']));
                }
                if(jQuery(that).val()!='hqbuy_shipping_Surface'){
                    jQuery(".trakingNumber").hide();
                    jQuery("#Need_Traking_Number").attr('checked',false);
                }else{
                    jQuery(".trakingNumber").show();
                }
            })
            .fail(function() {
                payableDimmer.hideDown(function(){
                    notify('Sorry, something wrong, please try again.');
                })
            })
            .always(function() {});
    }
    
    /*Tracking Number Checked*/
    function needTrackingNumberChange(){
        var trackingNumber = jQuery('#Need_Traking_Number');
        if(trackingNumber.attr('checked')){
            trackingNumber.attr('checked',false);
            var checked = 0;
        }else{
            trackingNumber.attr('checked',true);
            var checked = 1;
        }
        jQuery.ajax({
            url: '/hqshippinginsurance/index/trackingnumber',
            type: 'POST',
            dataType: 'json',
            data: 'checked='+checked,
            success: function(data){
                jQuery(".fixbox").html(jQuery(data['update_section']));
                
            }
        });
    }

    jQuery(".checkNew select[name='billing[country_id]']").change(function(event) {
        countryChange();
    })
    jQuery(".checkInfoPop").delegate('#country', 'change', function(event) {
        //countryChange();
    });

    jQuery("#firecheckout").delegate('.shippingOptions input[name="shipping_method"]', 'change', function(event) {
        shipChange(this);
    });
    
    jQuery(".shippingOptions").delegate("#Need_Traking_Number",'click',function(event){
        needTrackingNumberChange();
    });
    
    /*coupon and points*/
    jQuery(".checkDis .btno").click(function(event) {
        event.preventDefault();
        if (jQuery(this).prev('input').val()) {
            shipChange();
        }
    });

    function wholecheckout() {
        var url = jQuery("#firecheckout-form").attr('action'),
            dimmer = $().dimmer({
                contain: ".checkPayable"
            });
        dimmer.showUp();
        jQuery.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: jQuery("#firecheckout-form").serialize()
        })
            .done(function(data) {

                if (data.redirect) {
                    window.location.href = data.redirect;
                }
                if (data.error) {
                    dimmer.hideDown(function() {
                        notify(data.message);
                    })
                }
                if (data.order_created==true) {
                    window.location.href = '/checkout/onepage/success';
                }
                console.log("success");
            })
            .fail(function() {
                dimmer.hideDown(function() {
                    notify('Sorry, something wrong, please try again.', '.checkPayable');
                })
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }

    /*wholecheckout validate*/
    jQuery("#firecheckout").delegate('.payments button', 'click', function(event) {
        if (jQuery('.checkNew').length) { /*need to add the first address*/
            jQuery('#firecheckout-form').validate({
                rules: {
                    'billing[firstname]': "required",
                    'billing[lastname]': "required",
                    'billing[email]': {
                        required: true,
                        email: true
                    },
                    'billing[street][]': "required",
                    'billing[city]': "required",
                    'billing[country_id]': "required",
                    'billing[region_id]': "required",
                    'billing[region]': "required",
                    'billing[postcode]': "required",
                    'billing[telephone]': "required"
                },
                errorElement: "p",
                /*
                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                },
                */
                showErrors: function() {
                    this.defaultShowErrors();
                },
                submitHandler: function(form) {
                    event.preventDefault();
                    wholecheckout();
                }
            })
        } else {
            event.preventDefault();
            wholecheckout();
        }

        var fixContainer = $('.fixbox');
        var offset = fixContainer.offset();
        var top = $(document).scrollTop();
        var fix_top = 0;
        console.log(fixContainer.offset());
        if(top-offset.top>0){
			fix_top = top-offset.top;
            $('.fixbox').css({'top':fix_top,'position': 'absolute','left':'0'});
		}
    });
    
    
    (function(){
		var fixContainer = $('.fixbox');
		var offset = fixContainer.offset();
        console.log(offset.top);
		$(window).scroll(function(){
			var top = $(document).scrollTop();
			if(top-offset.top>0){
				fix_top = top-offset.top;
			}else{
                fix_top = 0;
			}
            $('.fixbox').css({'top':fix_top,'position': 'absolute','left':'0'});
		});
	})();
})