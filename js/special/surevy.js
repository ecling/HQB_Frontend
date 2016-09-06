$(document).ready(function() {
    colorsv();
    var surveyValidata = $('#survey').validate({
        rules: {
            'overall': 'required',
            'products[]': 'required',
            'need': 'required',
            'quality': 'required',
            'value': 'required',
            'express': 'required',
            'delivery': 'required',
            'questions': 'required',
            'customer': 'required',
            'purchase': 'required',
            'recommend': 'required'
        },
        errorElement: 'em',
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        submitHandler: function(form) {
            var serialize = jQuery(form).serialize();
            jQuery.ajax({
                    url: form.action,
                    type: 'POST',
                    dataType: 'json',
                    data: serialize
                })
                .done(function(data) {
                    notify(data.message, null, function() {
                        if (!data.error) {
                            window.location.href = data.redirect_url;
                        }
                    });
                })
                .fail(function(data) {
                    notify('Sorry, something wrong, please try again.');
                })
                .always(function() {});

        }
    })

    function colorsv() {
        $(".chose").each(function() {
            $(this).bind("click", function() {
                $(this).siblings('.chose').attr({
                    "class": "chose bg_999"
                });
                $(this).attr("class", "chose bg_orange");
                $(".choseInput").attr('value', $(this).attr('data-value'));
                var chose = $('.choseInput');
                surveyValidata.element(chose);
            })
        });
        $("textarea").one("focus", function() {
            $(this).val("");
        });
    };
});