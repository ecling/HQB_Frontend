/*this is the function include intializing the data and base function for product page*/

function initProFunc() {
    $(".switchImg").switchImg();
    $(".numInput").inputNum();
    /*counter time*/
    $(".limitTime").countTimer("{d} <span>day(s)</span> {h}:{m}:{s}");
    function propertyChange(opts, ifcustomsize) {//别名相关的提交与属性的变换
        var ids = [],
            storage = jQuery('.qty .storage'),
            num = 0,
            numInput = jQuery('.numInput input'),
            subbtn = jQuery('.proDetailAction button'),
            oneFreeBtn = jQuery('.proOneFree a.btn');
        opts.each(function(index, el) {
            var id = jQuery(el).attr('data-id');
            if (id) {
                ids.push(id);
            }
        });
        var itmeSkus;
        if (ids.length == 0 ){
            return false;
        }
        if (ids.length > 1) {
            var key1 = ids[0]+ "_" + ids[1],
                key2 = ids[1]+ "_" + ids[0];
            itmeSkus = skus[key1]?skus[key1]:skus[key2];
        }
        if (ids.length == 1 ){
            var key = ids[0];
            itmeSkus = skus[key];
        }
        if (itmeSkus){
            if (!ifcustomsize) {
                jQuery('input[name="alias"]').val(itmeSkus[0]);
            }

            jQuery('input[name="alias"]').attr('data-backup', itmeSkus[0]);
           num = itmeSkus[1]; 
        }
        numInput.val(1); //reset the min value;
        if (parseInt(num)) {
            if (parseInt(num) <= 10 && parseInt(num) > 0) {
                numInput.attr('max', parseInt(num));
                storage.show().find('span').text(parseInt(num));
            } else {
                numInput.removeAttr('max');
                storage.hide();
            }
            subbtn.removeAttr('disabled').removeClass('disabled');
            oneFreeBtn.removeClass('disabled');

        } else {
            if (parseInt(num) == 0) {
                storage.show().find('span').text(parseInt(num));
                subbtn.attr('disabled', true).addClass('disabled');
                oneFreeBtn.addClass('disabled');
            } else {
                numInput.removeAttr('max');
                storage.hide();
                oneFreeBtn.removeClass('disabled');
                subbtn.removeAttr('disabled').removeClass('disabled');
            }
        }
    }

    if (window.Modernizr.cssanimations) {
        if (jQuery('.proDetailOption').length) {
            jQuery(".proDetailOption .selectDrop select").each(function(index, el) {
                new SelectFx(el, {
                    onChange: function(val) {
                        var opts = jQuery('.proDetailOption .selectDrop option:selected'),
                            ifcustomsize = jQuery('.customsize input[type="checkbox"]:checked').length;
                        propertyChange(opts, ifcustomsize);
                    }
                });
            });
        }
    } else {
        // change the property 
        jQuery(".proDetailOption .optionItem").not('.customsize').find('select').change(function(event) {
            var opts = jQuery('.proDetailOption .selectDrop option:selected'),
                ifcustomsize = jQuery('.customsize input[type="checkbox"]:checked').length;
            propertyChange(opts, ifcustomsize);
        });
    }
    /*product optionItem(not select )*/
    var priceCon = jQuery('.proDetailPrice .cheap'),
        backUpPrice = priceCon.text();
    jQuery(".optionItem >ul >li").click(function(event) {
        var value = jQuery(this).attr('data-value'),
            id = jQuery(this).attr('data-id'),
            opts, ifcustomsize,
            dataPrice = jQuery(this).attr('data-price');
        jQuery(this).siblings('li').removeClass('selected');
        jQuery(this).addClass('selected');
        jQuery(this).parent('ul').find('input').val(value);
        jQuery(this).parent('ul').find('input').attr('data-id', id);
        /*change the price of pruduct when chagne the property*/

        if (dataPrice) {
            var symbol = priceCon.text().split(/\d/,1)[0],
                price = priceCon.text().match(/\w+(\d+.+)/g)[0],
                finalPrice = symbol + accAdd(price,dataPrice);
            priceCon.text(finalPrice);
        } else {
            priceCon.text(backUpPrice);
        }
        opts = jQuery(".proDetailOption .optionItem li.selected");
        propertyChange(opts, false);
    });


    /*add to cart button event on product page */
    jQuery(".proDetailAction button").click(function(event) {
        jQuery(this).addClass('active');
    });
}