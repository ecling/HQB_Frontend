(function($){
	var FixedTab = function(tab,con,sec){
		var tab_height = $(tab).height();
		var scroll = function(){
			var tab_client = $(tab).get(0).getBoundingClientRect();
			var con_client = $(con).get(0).getBoundingClientRect();
			if(tab_client.top<=0){				
				$(tab).css({'position':'fixed','top':'0','z-index':10});
			}
			if(con_client.top>tab_height){
				$(tab).css({'position':'relative'});
			}
		};
		var tabtoggle = function(){
			tab_li = $(tab).find("li");
			tab_li.each(function(i){
				var id = $(this).find("a").attr("data-scroll");
				var con_client = $(id).get(0).getBoundingClientRect();
				if(con_client.top<=40&&con_client.bottom>0){
					$(this).find("a").addClass("active");
					$(this).siblings().find("a").removeClass("active");
				}
			});
		};

		var tabbind = function(){
			tab_li = $(tab).find("li");
			tab_li.each(function(i){
				$(this).find("a").on("click",function(event){
					event.preventDefault();
					var id = $(this).attr("data-scroll");
					$('body,html').animate({scrollTop:$(id).offset().top},500);
				});
			});
		}
		tabbind();
		$(window).scroll(function(){
			scroll();
			tabtoggle();
		});
	};

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

	var InputNum = function(element){
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
	}

	$.fn.gallaryZoom = function(options){
		var gallaryZoom = new GallaryZoom(this,options);
	};

	$.fn.inputNum = function(){
		var inputNum = new InputNum(this);
	};

	$.fn.fixedtab = function(tab,Con,sec){
		var fixedtab = new FixedTab(tab,Con,sec);
	};
})(jQuery);

$(function(){
	$().fixedtab(".moreInfoBar",".moreInfoCon",".moreInfoSec");
	$(".switchImg").gallaryZoom();
	$(".numInput").inputNum();

	//产品属性选择
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
	    };

	    var imageChange = function(color_option){
	    	if(typeof(spConfig)=='undefined'){
	    		return false;
	    	}
	    	var sku= '';
	    	color_option = $(color_option);
	    	color = $(color_option).parents(".color");
	    	if(color.length>0){
	    		color_id = color_option.attr('data-value');
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
	    	var sku = '';
	    	if(typeof(spConfig)=='undefined'){
	    		return false;
	    	}
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
	    }

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
});















