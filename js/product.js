(function($){
    var GallaryZoom = function(element,options){
		setting = {
	        'zoomAreaW': 400,
	        'zoomAreaH': 400,
	        'showAreaW': 400,
	        'showAreaH': 400,
	        'originalImgW': 600,
	        'originalImgH': 600
    	};
    	var imgW = 0;
    		imgH = 0;
    		dimmer = '';
    		zoomDimmer = '';
    		zoomFilter = '';
    		zoomIn = '';
    		zoomInImg = '';

    	var extend = function(options){
    		for (var i in options) {
            	this.setting[i] = options[i]
        	}
    	};
    	var init = function(){
    		imgW = targetImg.attr('width');
	        imgH = targetImg.attr('height');
	        createDimmer();
	        createZoomFilter();
	        createZoomDimmer();
	        createZoomIn();
	        bind();
    	};
    	var createZoomDimmer = function(){
    		zoomDimmer = $("<div></div>");
	        zoomDimmer.css({
	            position: 'absolute',
	            width: '100%',
	            height: '100%',
	            left: '0px',
	            top: '0px'
	        });
	        zoomDimmer.appendTo(this.targetCon);
    	};
    	var createZoomFilter = function(){
    		zoomFilter = $("<div></div>");
	        zoomFilter.css({
	            position: 'absolute',
	            border: '1px solid white',
	            background: 'rgba(255,255,255,0.7)',
	            width: setting.zoomFilterW,
	            height: setting.zoomFilterH,
	            display: 'none'
	        });
	        zoomFilter.appendTo(this.targetCon);
    	};
    	var createZoomIn = function(){
    		zoomIn = $("<div><img src=''/></div>");
	        zoomIn.css({
	            position: 'absolute',
	            top: '0px',
	            marginLeft: '10px',
	            display: 'none',
	            zIndex:'10',
	            left: sizeRect(this.containt.find('ul')).sizeW + sizeRect(targetCon).sizeH,
	            width: setting.zoomAreaW,
	            height: setting.zoomAreaH
	        });
	        zoomInImg = zoomIn.find('img');
	        zoomInImg.attr('src', lis.eq(0).attr('data-zoom'));
	        zoomInImg.css({
	            position: 'absolute'
	        });
	        zoomIn.appendTo(this.containt);
    	};
    	var createDimmer = function(){
    		dimmer = $("<div></div>").css({
	            position: 'absolute',
	            width: '100%',
	            height: '100%',
	            zIndex: '2',
	            display: 'none',
	            left: '0px',
	            top: '0px',
	            background: 'rgba(255,255,255,0.5)'
	        });
	        dimmer.append($("<div class='square-spin ajax-loading'><div></div></div>"));
    	};
    	var showDimmer = function(){
    		dimmer.appendTo(targetCon).fadeIn('fast');
    	};
    	var hideDimmer = function(){
    		dimmer.fadeOut('fast', function() {
	            $(this).remove();
	        });
    	};
    	var updateStyle = function(index){
    		lis.removeClass('selected');
        	lis.eq(index).addClass('selected').addClass('loaded');
    	};
    	var updateImg = function(img){
	        img.attr({
	            width: imgW,
	            height: imgH
	        });
	        targetCon.find('img').fadeOut('fast', function() {
	            $(this).remove();
	            targetCon.append(img);
	        });
    	};
    	var loadImg = function(url, index, loaded){
    		var img = new Image();
	        if (loaded) {
	            updateImg($(img));
	            updateStyle(index);
	        } else {
	            showDimmer();
	            img.onload = function() {
	                hideDimmer();
	                updateImg($(img));
	                updateStyle(index);
	            }
	            img.onerror = function() {
	                hideDimmer();
	            }
	        }
	        img.src = url;
    	};
    	var positionFilter = function(x,y){
    		var w = setting.zoomFilterW,
	            h = setting.zoomFilterH,
	            sw = setting.showAreaW,
	            sh = setting.showAreaH,
	            left, top;
	        left = x - w / 2;
	        top = y - h / 2;
	        if (x < w / 2) {
	            left = 0;
	        }
	        if (y < h / 2) {
	            top = 0;
	        }
	        if (sw - x < w / 2) {
	            left = sw - w;
	        }
	        if (sh - y < h / 2) {
	            top = sh - h;
	        }
	        zoomFilter.css({
	            left: left,
	            top: top
	        });
	        zoomInImg.css({
	            left: 0 - left,
	            top: 0 - top
	        });
    	};
    	var bind = function(){
	        lis.click(function(event) {
	            var index = $(this).index(),
	                url = $(this).attr('data-url'),
	                zoomUrl = $(this).attr('data-zoom'),
	                loaded = $(this).hasClass('loaded');
	            loadImg(url, index, loaded);
	            zoomInImg.attr('src', zoomUrl);
	        });
	        zoomDimmer.mouseenter(function(event) {
	            zoomFilter.fadeIn('fast');
	            zoomIn.fadeIn('fast');
	        }).mouseleave(function(event) {
	            zoomFilter.fadeOut('fast');
	            zoomIn.fadeOut('fast');
	        }).mousemove(function(event) {
	            positionFilter(event.offsetX, event.offsetY)
	        });
    	};

    	extend(options);
    	setting.zoomFilterW = setting.originalImgW - setting.zoomAreaW;
    	setting.zoomFilterH = setting.originalImgH - setting.zoomAreaH;
    	containt = $(element);
    	lis = containt.find('li');
    	targetCon = containt.find('div');
    	targetImg = targetCon.find('img');
    	init();
	};
    
    var sizeRect = function(dom){
		var w = $(dom).outerWidth();
	    var h = $(dom).outerHeight();
	    var margins = $(dom).css('margin').split(' ');
	    if (margins.length > 1) {
	        var width = parseInt(margins[1]) + parseInt(margins[3]) + w;
	        var height = parseInt(margins[0]) + parseInt(margins[2]) + h;
	    } else {
	        var width = w;
	        var height = h;
	    }
	    return {
	        'sizeW': width,
	        'sizeH': height
	    }
	};
    
    var ProductInputNum = function(element){
		contain = $(element);
	    add = contain.find('.plus');
	    min = contain.find('.minus');
	    input = contain.find('input');

		var minNum = 1;
			maxNum = 9999;
			stepNum = 9999;

		var init = function(){
			dealInput();
			/*
	        if (!window.Modernizr.inputtypes.number) {
	            bind();
	        } else {
	            add.hide();
	            min.hide();
	        }
	        */
	        bind();
	        blurCheck();
		};
		var dealInput = function(){
			minNum = input.attr('min'),
	        maxNum = input.attr('max'),
	        stepNum = input.attr('step');
		};
		var checkValue = function(){
			dealInput();
	        var value = input.val();
	        if (Number(value) == NaN || Number(value) > maxNum || Number(value) < minNum) {
	            input.val(minNum)
	        }
		};
		var bind = function(){
	        add.click(function(event) {
	            checkValue();
	            var value = input.val(),
	                result;
	            result = Number(value) + Number(stepNum);
	            if (result <= maxNum) {
	                input.val(result);
	            }
	        });
	        min.click(function(event) {
	            checkValue();
	            var value = input.val(),
	                result;
	            result = Number(value) - stepNum;
	            if (result >= minNum) {
	                input.val(result);
	            }
	        });
		};
		var blurCheck = function(){
	        input.blur(function(event) {
	            checkValue();
	        });
		};
		init();
	};
    $.fn.gallaryZoom = function(options){
		var gallaryZoom = new GallaryZoom(this,options);
	};

	$.fn.productInputNum = function(){
		var productInputNum = new ProductInputNum(this);
	};
})(jQuery);


function scrollbyside(padding, bar, aside, content) {
    this.bar = $(bar);
    this.aside = $.support.leadingWhitespace ? $(aside) : $(); //ie8 crash when the two fixed dom appear on page
    this.content = $(content);
    this.backUp = this.bar.prev('.backUp');
    this.originHeight = this.bar.height();
    this.originAsideHeight = this.aside.height();
    this.bar.data('oldValue', 'static');
    this.init();
}
scrollbyside.prototype = {
    init: function() {
        this.bar.find('a').scrollTo();
        this.bind();
    },
    bind: function() {
        var that = this;
        $(window).scroll(function() {
            var contentHeight = that.content.height();
            var barRect = that.bar.get(0).getBoundingClientRect();
            var contentRect = that.content.get(0).getBoundingClientRect();
            if (barRect.top <= 0) {
                $("#sticky").removeClass('active');
                that.backUp.addClass('active');
                that.bar.css({
                    position: 'fixed',
                    top: '0',
                    zIndex: '4'
                });
                that.aside.css({
                    position: 'fixed',
                    top: '0',
                    zIndex: '3'
                });
            }
            if (contentRect.bottom <= that.originHeight) {
                that.bar.css({
                    position: 'absolute',
                    top: contentHeight - that.originHeight
                });
            }
            if (contentRect.bottom >= that.originHeight && contentRect.top <= 0) {
                that.bar.css({
                    position: 'fixed',
                    top: '0',
                    zIndex: '4'
                });
                that.aside.css({
                    position: 'fixed',
                    top: '0',
                    zIndex: '3'
                });
            }
            if (contentRect.bottom <= that.originAsideHeight) {
                that.aside.css({
                    position: 'absolute',
                    top: contentHeight - that.originAsideHeight + that.originHeight
                });
            }
            if (contentRect.top >= that.originHeight) {
                that.backUp.removeClass('active');
                that.bar.css({
                    position: 'static'
                });
                that.aside.css({
                    position: 'static'
                });
            }
            if (that.bar.data('oldValue') !== that.bar.css('position')) { //检测bar变化，重新给定事件
                that.bar.data('oldValue', that.bar.css('position'));
                that.bar.find('a').off();
                that.bar.find('a').scrollTo();
            };
            that.scrollBind();
        })

    },
    scrollBind: function() {
        var as = this.bar.find('a[data-scroll]')
        for (var i = 0; i < as.length; i++) {
            var aims = as.eq(i).attr('data-scroll');
            this.barActive(aims, as, this.originHeight);
        };
    },
    barActive: function(aim, as, height) {
        var dom = $(aim).get(0);
        if (dom) {
            var rect = dom.getBoundingClientRect();
            if (height < rect.bottom && rect.top <= height) {
                as.removeClass('active');
                $("a[data-scroll='" + aim + "']").addClass('active')
            }
        }
    }
}

$(function() {

    /*navigator show sub list*/
    $('.hasSubNav').mouseenter(function(event) {
        $(this).find('.subNavigator').stop().slideDown('fast');
    }).mouseleave(function(event) {
        $(this).find('.subNavigator').stop().slideUp('fast');
    });
    if (!$.support.leadingWhitespace) {
        $('.moreInfoBar ul li a').scrollTo();
    } else {}
    new scrollbyside(10, '.moreInfoBar', '.moreInfoAside', '.moreInfoCon');

    $('.switchImg').gallaryZoom();
    $('.numInput').productInputNum();
    
    //属性选择处理
    (function(){
    function propertyChange(opts, ifcustomsize) {//别名相关的提交与属性的变换
        var ids = [],
            storage = $('.qty .storage'),
            num = 0,
            numInput = $('.numInput input'),
            subbtn = $('.proDetailAction button'),
            oneFreeBtn = $('.proOneFree a.btn');
        opts.each(function(index, el) {
            var id = $(el).attr('data-id');
            if (id) {
                ids.push(id);
            }
        });
        var itmeSkus;
        if (ids.length == 0) {
            return false;
        }
        if (ids.length > 1) {
            var key1 = ids[0] + "_" + ids[1],
                key2 = ids[1] + "_" + ids[0];
            itmeSkus = skus[key1] ? skus[key1] : skus[key2];
        }
        if (ids.length == 1) {
            var key = ids[0];
            itmeSkus = skus[key];
        }
        if (itmeSkus) {
            if (!ifcustomsize) {
                $('input[name="alias"]').val(itmeSkus[0]);
            }

            $('input[name="alias"]').attr('data-backup', itmeSkus[0]);
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
    
    var imageChange = function(color_option){
            if(typeof(spConfig)=='undefined'){
	    		return false;
	    	}
	    	var sku= '';
	    	color_option = $(color_option);
	    	color = $(color_option).parents(".color");
	    	if(color.length>0){
	    		color_id = color_option.attr('data-value');
	    		
	    		if(typeof(spConfig)=='undefined'){
	    			return false;
	    		}
	    		color_pids = spConfig['attribute']['981'][color_id];
	    		color_pid = color_pids['0'];
	    		if(color_pid){
	    			color_sku = spConfig['images'][color_pid];
	    			if(color_sku){
	    				switchImg = '<ul>';
	    				
	    				for(i=1;i<=color_sku['num'];i++){
	    					sku = color_sku['sku'];
	    					str = sku.substr(0,2);
	    					if(i==1){
	    						s_image = "http://highqualityforyou.com/images/high/"+str+"/s/HIGH-"+sku+".jpg";
	    						l_image = "http://highqualityforyou.com/images/high/"+str+"/HIGH-"+sku+".jpg";
	    						first_image = l_image;
	    					}else{
	    						s_image = "http://highqualityforyou.com/images/high/"+str+"/s/HIGH-"+sku+"-"+i+".jpg";
	    						l_image = "http://highqualityforyou.com/images/high/"+str+"/HIGH-"+sku+"-"+i+".jpg";
	    					}
	    					switchImg = switchImg+'<li class="'+(i==1?'selected':'')+'" data-url="'+l_image+'" data-zoom="'+l_image+'"><img width=70 height=70 src="'+s_image+'" /></li>';
	    				}
	    				switchImg = switchImg+'</ul>';
	    				switchImg = switchImg+'<div><img width=400 height=400 src="'+first_image+'" /></div>';
	    				$(".switchImg").html(switchImg);
	    				$(".switchImg").gallaryZoom();
	    			}
	    		}
	    	}
	    };
        
    var skuChange = function(options){
            if(typeof(spConfig)=='undefined'){
	    		return false;
	    	}
	    	var sku = '';
	    	options.each(function(i){
	    		attribute_id = $(this).siblings("input").attr('data-id');
	    		option_id = $(this).attr('data-value');
	    		pids = spConfig['attribute'][attribute_id][option_id];
	    		if(i==0){
	    			base_ids = pids;
	    		}else{
	    			temp_ids = [];
		    		$.each(pids,function(i){
		    			$.each(base_ids,function(j){
		    				if(pids[i]==base_ids[j]){
		    					temp_ids.push(pids[i]);
		    				}
		    			});
		    		});
		    		base_ids = temp_ids;
	    		}
	    	});
	    	if(base_ids){
	    		sku = spConfig['images'][base_ids['0']];
	    		$(".sku").text(sku['sku']);
	    	}
	    };    

    if (window.Modernizr.cssanimations) {
        if ($('.proDetailOption').length) {
            $(".proDetailOption .selectDrop select").each(function(index, el) {
                new SelectFx(el, {
                    onChange: function(val) {
                        var opts = $('.proDetailOption .selectDrop option:selected'),
                            ifcustomsize = $('.customsize input[type="checkbox"]:checked').length;
                        propertyChange(opts, ifcustomsize);
                    }
                });
            });
        }

        $(".productAddon .selectDrop select").each(function(index, el) {
            new SelectFx(el); // reviewPop selection drop menu
        });
    } else {

        // change the property
        $(".proDetailOption .optionItem").not('.customsize').find('select').change(function(event) {
            var opts = $('.proDetailOption .selectDrop option:selected'),
                ifcustomsize = $('.customsize input[type="checkbox"]:checked').length;
            propertyChange(opts, ifcustomsize);
        });
    }

    /*product optionItem(not select )*/
    var priceCon = $('.proDetailPrice .cheap'),
        backUpPrice = priceCon.text();
    $(".optionItem >ul >li").click(function(event) {
        var value = $(this).attr('data-value'),
            id = $(this).attr('data-id'),
            opts, ifcustomsize,
            dataPrice = $(this).attr('data-price');
        $(this).siblings('li').removeClass('selected');
        $(this).addClass('selected');
        $(this).parent('ul').find('input').val(value);
        $(this).parent('ul').find('input').attr('data-id', id);

        /*change the price of pruduct when chagne the property*/

        if (dataPrice) {
            var symbol = priceCon.text().split(/\d/, 1)[0],
                price = priceCon.text().match(/\w+(\d+.+)/g)[0],
                finalPrice = symbol + accAdd(price, dataPrice);
            priceCon.text(finalPrice);
        } else {
            priceCon.text(backUpPrice);
        }
        opts = $(".proDetailOption .optionItem li.selected");
        propertyChange(opts, false);
        imageChange(this);
        skuChange(opts);
    });


    if ($(".customsize").length) {
        $().popUp({
            handler: '.customsize .img',
            dimmer: '.measurePop'
        });
    }
    })();


    if ($(".reviewPop").length) {
        /*review form validate*/
        var popReview,reviewConfirm,reviewBuyIt;
        var reviewValidate = $(".reviewPop form").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 10,
                    maxlength: 55
                },
                detail: 'required'
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },
            errorElement: "em",
            showErrors: function() {
                this.defaultShowErrors();
                popReview.setActualRect();
            },
            submitHandler: function(form) {
                var dimmer = new Dimmer({
                    contain: ".reviewPop .popUp"
                });
                dimmer.showUp();
                // this function uploads image should use formData
                // need to be support by backend,so just delay it

                try {
                    var formData = new FormData($('.upload form')[0]);
                    $.ajax({
                    url: form.action,
                    type: 'POST',
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    cache: false,
                    headers: {
                        'isAjax': true
                    },
                    data: formData
                })
                    .done(function(data) {
                        if (data.success) {
                            notify(data.success, ".reviewPop", function() {
                                popReview.hideDown();
                            });
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        dimmer.hideDown();
                    });

                } catch(e){
                    form.submit();
                }
            }
        });

        /*review log in validate form*/
        $('#login-form').validate({
            rules: {
                "login[username]": {
                    required: true,
                    email: true
                },
                "login[password]": "required"
            },
            errorElement: "em",
            showErrors: function() {
                this.defaultShowErrors();
                reviewConfirm.setActualRect();
            },
            submitHandler: function(form) {
                var dimmer = new Dimmer({
                    contain: ".reviewConfirm .popUp"
                });
                dimmer.showUp();
                // this function uploads image should use formData
                // need to be support by backend,so just delay it
                $.ajax({
                    url: form.action,
                    type: 'POST',
                    dataType: 'json',
                    data: $(form).serialize()
                })
                    .done(function(data) {
                        if (!data.error) {
                            notify(data.message, ".reviewConfirm", function() {
                                reviewConfirm.hideDown();
                                $('.toolkit li').eq(0).replaceWith($(data.html));
                            });
                        } else {
                            notify(data.message,".reviewConfirm");
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        dimmer.hideDown();
                        console.log("complete");
                    });
            }
        });


        /*reivewBuyIt popup window event*/
        $('.reviewBuyIt a').click(function(event) {
            event.preventDefault();
            $(this).attr('click', 'true');
            reviewBuyIt.hideDown();
        });
        $("#reviews .buttonMore button").click(function(event) {
            event.preventDefault();
            var id = $('input[name="product"]').val();
            $.ajax({
                url: '/review/product/validation/id/' + id,
                type: 'GET',
                dataType: 'json'
            })
                .done(function(data) {
                    if (data.error) {
                        if(data.error_code===1){
                            // show up the log in popUp window when user doesn't log in;
                            if (!reviewConfirm) {
                                reviewConfirm = $().popUp({
                                        dimmer:'.reviewConfirm'
                                });
                            }
                            reviewConfirm.showUp();
                        } else {
                            // show up the buyFist message in popUp window when user log in but doesn't buy it;
                            if (!reviewBuyIt) {
                                reviewBuyIt = new PopUp({
                                    dimmer:'.reviewBuyIt',
                                    afterClose:function(){
                                        var buyItA = $('.reviewBuyIt a');
                                        if(buyItA.attr('click')==='true'){
                                            $('html,body').animate({
                                                scrollTop: $('.productCon').offset().top
                                            }, 600,function(){
                                                buyItA.attr('click', 'false');
                                            });
                                        }
                                    }
                                });
                            }
                            reviewBuyIt.showUp();
                        }
                    } else {
                        $("#reviews .buttonMore button").off();
                        if (!popReview) {
                            popReview = new PopUp({
                                handler: '#reviews .buttonMore button',
                                dimmer: '.reviewPop',
                                afterClose: function() {
                                    reviewValidate.resetForm();
                                    $(".reviewPop form").get(0).reset();
                                }
                            });
                        }
                        popReview.showUp();
                    }
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        });

    }
    //shippingChange radio function
    $('.ship_company').radio();


    // review rate function
    $(".reviewPop .proReview").each(function(index, el) {
        $(el).rate();
    });

    /*counter time*/
    $().countTimer('.limitTime', "{d} <span>day(s)</span> {h}:{m}:{s}");

    $('#reviews').imagePreview();

    /* product form validate if the customsize checbox is checked*/
    if ($(".customsize").length) {
        var productValidate = $("#product_addtocart_form").validate({
                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                    error.appendTo(element.parents('label'));
                },
                errorElement: "em"
            }),
            customsizeInput = $(".customsize input[type='text']"),
            aliasBack = "";
        $(".customsize div input").add('.customsize div select').attr('disabled', 'true');
        $(".customsize input[type='checkbox']").change(function(event) {
            if (this.checked) {
                $('input[name="alias"]').val("");
                $(this).parent('label').addClass('selected');
                $('.customsize > div').eq(0).slideDown();
                $(".customsize").prev('div').find('.selectDrop').addClass('disable');
                $(".customsize").prev('div').find('select').attr('disabled', 'true');
                $(".customsize div input").add('.customsize div select').removeAttr('disabled');
                customsizeInput.each(function(index, el) {
                    $(el).rules('add', {
                        required: true
                    })
                });
            } else {
                aliasBack = $('input[name="alias"]').attr('data-backup');
                $('input[name="alias"]').val(aliasBack);
                $('.customsize > div').eq(0).slideUp();
                $(this).parent('label').removeClass('selected');
                $(".customsize").prev('div').find('.selectDrop').removeClass('disable');
                $(".customsize").prev('div').find('select').removeAttr('disabled');
                $(".customsize div input").add('.customsize div select').attr('disabled', 'true');
                customsizeInput.each(function(index, el) {
                    $(el).rules('add', {
                        required: false
                    })
                });
            }
        });
    }

    /*also bought */
    if ($('.alsobought').length) {
        new SlideBox('.inner-also', 230, 5);
    }

    /*add to cart button event on product page */
    $(".proDetailAction button").click(function(event) {
        if (productValidate) { // when the valdate passed
            if (productValidate.form()) {
                $(this).addClass('active');
            }
        } else {
            $(this).addClass('active');

        }
    });

    /*fixup the currency symbol width*/
    function fixup() {
        var width = $("#wholesale .sp div span").width();
        $("#wholesale .sp div input").css('paddingLeft', width + 12);
    };
    fixup();

    /*wholeseal validate*/

    $('#wholesale form').validate({
        rules: {
            name: "required",
            phone: {
                required: true,
                number: true
            },
            email: {
                required: true,
                email: true
            },
            targetprice: {
                required: true,
                number: true

            },
            quantity: {
                required: true,
                number: true
            },
            country: "required",
            message: "required"
        },
        errorPlacement: function(error, element) {
            if (element.is("textarea")) {
                error.appendTo(element.parent());
            } else {
                error.appendTo(element.parents('label'));
            }
        },
        errorElement: "em",
        submitHandler: function(form) {
            var dimmer = new Dimmer({
                contain: "#wholesale"
            });
            dimmer.showUp();
            $.ajax({
                url: '/wholesale/index/ajax',
                type: 'POST',
                dataType: 'json',
                data: $(form).serialize()
            })
                .done(function(data) {
                    dimmer.hideDown(function() {
                        notify('submit success', '#wholesale');
                        form.reset();
                    })
                })
                .fail(function(data) {
                    notify('submit fail', '#wholesale');

                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }
    })

    /*price match*/

    var pirceMatchPop = $().popUp({
        handler: '.proDetailList a:nth-of-type(2)',
        dimmer: '.priceMatch',
        width: '700px',
        height: '550px'
    })
    $("#price_match").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            url: {
                required:true,
                url:true
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "em",
        showErrors: function() {
            this.defaultShowErrors();
        },
        submitHandler: function(form) {
            var dimmer = new Dimmer({
                    contain: ".priceMatch .popUp"
                });
            dimmer.showUp();
            $.ajax({
                url: '/match/index/index',
                type: 'POST',
                dataType: 'json',
                data: $("#price_match").serialize(),
            })
                .done(function(data) {
                    notify(data.messege,'.priceMatch .popInner');
                    if(!data.error){
                        form.reset();
                    }
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    dimmer.hideDown();
                });

        }
    });

    /*buy one get on free */
    if ($('.proOneFree').length) {
        function checkChecked(input) {
            var value = true;
            input.each(function() {
                value = value && Boolean(this.value);
            })
            return value;
        }

        function strToObj(str, obj) {
            var tmpObj = {},
                tmp1, tmp2, product;
            tmp1 = str.split('&');
            for (var i = tmp1.length - 1; i >= 0; i--) {
                var tmp = tmp1[i].split('=');
                tmpObj[tmp[0]] = tmp[1];
            };
            product = tmpObj['product'];
            delete tmpObj['product'];
            obj[product] = tmpObj;
            return obj;
        }
        var freeInput = $('.proOneFree [name="together_products"]'),
            proForm = $('#product_addtocart_form'),
            proPrice = $(".proOneFree li:first-of-type span"),
            price = proPrice.attr('data-price'),
            fin = proPrice.attr('data-final'),
            ac = true,
            dataObj = {};

        $(".proOneFree li>.btn").click(function(event) {
            event.preventDefault();
            var disabled = $(this).hasClass('disabled');
            if (!disabled && ac) {
                var FormObj = strToObj(proForm.serialize(), dataObj);
                $(this).addClass('loading disabled');
                ac = false;
                $.ajax({
                    url: '/checkout/cart/together',
                    type: 'POST',
                    dataType: 'json',
                    data: FormObj
                })
                    .done(function(data) {
                        if (!data.error) {
                            window.location = data.redirect_url;
                        }
                    })
                    .fail(function() {
                        console.log("error");
                        ac = true;

                    })
                    .always(function() {
                        console.log("complete");
                        $(this).removeClass('loading disabled');
                    });
            }


        });
        $(".proOneFree").delegate(".options .btn", 'click', function(event) {
            event.preventDefault();
            var target = $(event.target),
                spanPrice = target.parents('.options').prev('div').find('span');
            if (target.index() == 1) {
                if (checkChecked(target.parents('.options').find('select'))) {
                    target.parents('.options').removeClass('active');
                    price = accAdd(price, spanPrice.attr('data-price'));
                    fin = accAdd(fin, spanPrice.attr('data-final'));
                    var tmpObj = {};
                    target.parents('.options').find('select').each(function() {
                        tmpObj[$(this).attr('name')] = $(this).val();
                    });
                    dataObj[target.parents('.options').prev('div').find('input').val()] = tmpObj;
                    var text = $('.proOneFree .total').html(),
                        newP = text.replace(/\d+\.\d+/, fin + ""),
                        newF = text.replace(/\d+\.\d+/, Subtr(price, fin) + "");
                    $('.proOneFree .total').html(newP);
                    $('.proOneFree .save').html(newF);
                }
            }
            if (target.index() == 2) {
                target.parent('.options').removeClass('active');
                target.parents('.options').prev('div').find('input')[0].checked = false;
                target.parents('.options').find('select').each(function() {
                    delete dataObj[$(this).attr('name')];
                });
            }
        });
        freeInput.change(function(event) {
            var target = $(event.target),
                tarPrice = target.siblings('span');
            if (event.target.checked) {
                if (target.parents('li').find('.options').length) {
                    event.preventDefault();
                    target.parents('li').find('.options').addClass('active');
                    return;
                } else {
                    price = accAdd(price, tarPrice.attr('data-price'));
                    fin = accAdd(fin, tarPrice.attr('data-final'));
                    dataObj[target.val()] = "";
                }
            } else {
                if (target.parents('li').find('.options').length) {
                    delete dataObj[$(this).val()];
                } else {
                    delete dataObj[target.val()];
                }
                price = Subtr(price, tarPrice.attr('data-price'));
                fin = Subtr(fin, tarPrice.attr('data-final'));
            }
            var text = $('.proOneFree .total').html(),
                newP = text.replace(/\d+\.\d+/, fin + ""),
                newF = text.replace(/\d+\.\d+/, Subtr(price, fin) + "");
            $('.proOneFree .total').html(newP);
            $('.proOneFree .save').html(newF);

        });
    }
    
    $().lazyLoadImg('.showlist img,.bestSell img');
})