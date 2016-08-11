$(function(){
    var $uploadCrop;

        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    });
                    $('.upload-demo').addClass('ready');
                }
                
                reader.readAsDataURL(input.files[0]);
            }
            else {
                alert("Sorry - you're browser doesn't support the FileReader API");
            }
        }

        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 200,
                height: 200,
                type: 'circle'
            },
            boundary: {
                width: 300,
                height: 300
            }
        });
            
        $('#upload').on('change', function () { 
            $(".crop").show();
            readFile(this); 
        });
        $('.queding').on('click', function (ev) {
            $uploadCrop.croppie('result', 'canvas').then(function (resp) {
                popupResult({
                    src: resp
                });
            });
            $(".crop").hide();
        });
        
    function popupResult(result) {
        var html;
        if (result.html) {
            html = result.html;
        }
        if (result.src) {
            html = '<img src="' + result.src + '" />';
        }
        $("#result").html(html);
    }


var $li = $(".account_setting_tab li");
    var $div = $(".account_setting_conter>div");
    $li.on('click', function() {
        var $this = $(this);
        $li.removeClass('tab_style');
        $this.addClass('tab_style');
        $index = $this.index();
        $div.css('display','none');
        $div.eq($index).css('display','block');
    });
    

});