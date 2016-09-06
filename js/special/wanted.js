$(function() {
    $(".wrapNav a").scrollTo(20);

    var rotateUl = $('.rotateRight ul');

    function rollup() {
        var li = rotateUl.find('li').eq(0);
        rotateUl.animate({
                top: '-21px'
            },
            600, function() {
                rotateUl.css('top', '0px');
                li.remove().appendTo(rotateUl);
            });
        setTimeout(rollup, 3000);
    }
    rollup();


    $('.stick').click(function(event) {
        var that = this;
        if (jQuery(this).attr('done') === 'true') {
            return false;
        }
        $.ajax({
            url: '/gift/index/getGift',
            type: 'GET',
            dataType: 'json'
        })
            .done(function(data) {
                if (data.gift) {
                    $('.giftPop .popInner').html(data.messege);
                    var giftpop = new PopUp({
                        dimmer: ".giftPop",
                        width: "500px"
                    });
                    var deg = (Number(data.gift) - 1) * 60 + 360;
                    $(".rotateLeft ul").css({
                        'transition': 'transform ' + 2 + 's ease-in-out',
                        'transform': 'rotate(' + deg + "deg)"
                    });
                    setTimeout(function() {
                        giftpop.showUp();
                        $.get('/gift/index/send');
                    }, 2000);
                    jQuery(that).attr('done', 'true');
                }
            })
            .fail(function() {

            })
            .always(function() {
                console.log("complete");
            });

    });

    //heart
    $("#part1 ul").delegate('div>a', 'click', function(event) {
        event.preventDefault();
        $.ajax({
            url: event.currentTarget.href,
            type: 'GET',
            dataType: 'text'
        })
        .done(function(data) {
            $(event.currentTarget).next("span").text(data);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });


    });

    //upload photo
    var fileControl = $('.upload input[type="file"]');
    $(".upload button").click(function(event) {
        event.preventDefault();
        if (giftvalidate()) {
            fileControl.get(0).click();
        }
    });

    function giftvalidate() {
        var email = $(".upload input[name='email']"),
            name = $(".upload input[name='name']"),
            emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        if (!email.val() || !name.val()) {
            notify("The fields are reqiured");
            return false;
        }
        if (email.val() && !emailReg.test(email.val())) {
            console.log(emailReg.test(email.val()))
            notify("Pattern of emial is incorrect");
            return false;
        }
        return true;
    }
    fileControl.change(function(event) {
        if (this.value) {
            try {
                var form = new FormData($('.upload form')[0]);
                $.ajax({
                    url: '/gift/index/post',
                    type: 'POST',
                    dataType: 'text',
                    processData: false,
                    contentType: false,
                    cache: false,
                    headers: {
                        'isAjax': true
                    },
                    data: form
                })
                    .done(function(text) {
                        notify(text);
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });

            } catch (e) {
                $('.upload form').get(0).submit();
            }
        }
    });

    // load more for part1
    $(".loadMore").click(function(event) {
        var loadId = $("#part1 li").last().attr('data-id');
        var dimmer = new Dimmer({
            "contain": '#part1'
        });
        dimmer.showUp();
        $.ajax({
            url: '/gift/index/list',
            type: 'GET',
            dataType: 'json',
            data: {
                id: loadId
            },
        })
            .done(function(data) {
                $("#part1 ul").append($(data));
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                dimmer.hideDown();
                console.log('always');
            });

    });
});