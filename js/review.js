;
jQuery(function() {

    /*navigator show sub list*/
    $('.hasSubNav').mouseenter(function(event) {
        $(this).find('.subNavigator').stop().slideDown('fast');
    }).mouseleave(function(event) {
        $(this).find('.subNavigator').stop().slideUp('fast');
    });

    $("select[name='billing[country_id]']").selectUnio("select[name='billing[region_id]']", "input[name='billing[region]']");
    $("select[name='shipping[country_id]']").selectUnio("select[name='shipping[region_id]']", "input[name='shipping[region]']");

    jQuery("[name='billing[as_shipping]']").change(function(event) {
        if (this.checked) {
            jQuery(this).parents('.field').prev('fieldset').slideUp();
        } else {
            jQuery(this).parents('.field').prev('fieldset').slideDown();

        }
    });

    /*form validate*/
    var orderForm = jQuery("#order_review_form");
    var orderValidate = orderForm.validate({
        rules: {
            'billing[firstname]': 'required',
            'billing[lastname]': 'required',
            'billing[street][]': 'required',
            'billing[city]': 'required',
            'billing[region_id]': 'required',
            'billing[postcode]': 'required',
            'billing[region]': 'required',
            'billing[country_id]': 'required',
            'billing[telephone]': 'required',
            'shipping[firstname]': 'required',
            'shipping[lastname]': 'required',
            'shipping[street][]': 'required',
            'shipping[city]': 'required',
            'shipping[region_id]': 'required',
            'shipping[postcode]': 'required',
            'shipping[region]': 'required',
            'shipping[country_id]': 'required',
            'shipping[telephone]': 'required',
            'shipping_method': 'required'
        },
        errorElement: "em",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        showErrors: function() {
            this.defaultShowErrors();
        },
        focusInvalid: false,
        invalidHandler: function(form, validator) {

            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top-100
            }, 200);

        }
    })
    jQuery("#update_order").click(function(event) {
        event.preventDefault();
        var url = "/paypal/express/updateOrder/";
        if (orderValidate.form()) {
            orderForm.attr('action', url);
            orderForm.get(0).submit();
        };
    });
    jQuery("#review_submit").click(function(event) {
        event.preventDefault();
        if (!jQuery(this).hasClass('disable')) {
            if (orderValidate.form()) {
                jQuery(this).addClass('disable');
                var dimmer = $().dimmer({
                    contain: "#details-reload"
                });
                dimmer.showUp();
                jQuery.ajax({
                    url: '/paypal/express/updateOrder/?isAjax=1',
                    type: 'POST',
                    dataType: 'html',
                    data: orderForm.serialize()
                })
                    .done(function(data) {
                        orderForm.get(0).submit();
                    })
                    .fail(function() {
                        dimmer.hideDown(function(){
                            notify('Sorry, palce order failed, please try again.');
                        })
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });
            };
        }
    });

    jQuery("[name='billing[country_id]']").add("[name='shipping[country_id]']").change(function(event) {
        var dimmer = $().dimmer({
            contain: ".paypal-shipping-method"
        });
        dimmer.showUp();
        jQuery.ajax({
            url: '/paypal/express/updateShippingMethods',
            type: 'POST',
            dataType: 'html',
            data: orderForm.serialize()
        })
            .done(function(data) {
                dimmer.hideDown(function() {
                    jQuery("#shipping-method-container").replaceWith(jQuery(data));
                })
                console.log("success");
            })
            .fail(function() {
                dimmer.hideDown(function(){
                    notify('Sorry, something wrong, please try again.');
                })
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });
    jQuery(".paypal-shipping-method").delegate('#shipping_method', 'change', function(event) {
        var dimmer = $().dimmer({
            contain: "#details-reload"
        });
        dimmer.showUp();
        jQuery.ajax({
            url: '/paypal/express/updateOrder/?isAjax=1',
            type: 'POST',
            dataType: 'html',
            data: orderForm.serialize()
        })
            .done(function(data) {
                dimmer.hideDown(function() {
                    jQuery('#details-reload').html(jQuery(data));
                    // jQuery('#shipping-method-container').replaceWith(jQuery(data.shipping_method));
                })
            })
            .fail(function() {
                dimmer.hideDown(function(){
                    notify('Sorry, something wrong, please try again.');
                })
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });

})