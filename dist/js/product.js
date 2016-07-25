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

	var GallaryZoom = function(options){
		setting = {
	        'zoomAreaW': 400,
	        'zoomAreaH': 400,
	        'showAreaW': 400,
	        'showAreaH': 400,
	        'originalImgW': 600,
	        'originalImgH': 600
    	};
    	extend(options);
    	setting.zoomFilterW = this.setting.originalImgW - this.setting.zoomAreaW;
    	setting.zoomFilterH = this.setting.originalImgH - this.setting.zoomAreaH;
    	containt = $(this.setting.select);
    	lis = this.containt.find('li');
    	targetCon = this.containt.find('div');
    	targetImg = this.targetCon.find('img');
    	init();
    	var extend = function(options){
    		for (var i in options) {
            	this.setting[i] = options[i]
        	}
    	};
    	var init = function(){
    		this.imgW = this.targetImg.attr('width');
	        this.imgH = this.targetImg.attr('height');
	        this.createDimmer();
	        this.createZoomFilter();
	        this.createZoomDimmer();
	        this.createZoomIn();
	        this.bind();
    	};
    	var createZoomDimmer = function(){
    		this.zoomDimmer = $("<div></div>");
	        this.zoomDimmer.css({
	            position: 'absolute',
	            width: '100%',
	            height: '100%',
	            left: '0px',
	            top: '0px'
	        });
	        this.zoomDimmer.appendTo(this.targetCon);
    	};
    	var createZoomFilter = function(){
    		this.zoomFilter = $("<div></div>");
	        this.zoomFilter.css({
	            position: 'absolute',
	            border: '1px solid white',
	            background: 'rgba(255,255,255,0.7)',
	            width: this.setting.zoomFilterW,
	            height: this.setting.zoomFilterH,
	            display: 'none'
	        });
	        this.zoomFilter.appendTo(this.targetCon);
    	};
    	var createZoomIn = function(){
    		this.zoomIn = $("<div><img src=''/></div>");
	        this.zoomIn.css({
	            position: 'absolute',
	            top: '0px',
	            marginLeft: '10px',
	            display: 'none',
	            zIndex:'10',
	            left: sizeRect(this.containt.find('ul')).sizeW + sizeRect(this.targetCon).sizeH,
	            width: this.setting.zoomAreaW,
	            height: this.setting.zoomAreaH
	        });
	        this.zoomInImg = this.zoomIn.find('img');
	        this.zoomInImg.attr('src', this.lis.eq(0).attr('data-zoom'));
	        this.zoomInImg.css({
	            position: 'absolute'
	        });
	        this.zoomIn.appendTo(this.containt);
    	};
    	var createDimmer = function(){
    		this.dimmer = $("<div></div>").css({
	            position: 'absolute',
	            width: '100%',
	            height: '100%',
	            zIndex: '2',
	            display: 'none',
	            left: '0px',
	            top: '0px',
	            background: 'rgba(255,255,255,0.5)'
	        });
	        this.dimmer.append($("<div class='square-spin ajax-loading'><div></div></div>"));
    	};
    	var showDimmer = function(){
    		this.dimmer.appendTo(this.targetCon).fadeIn('fast');
    	};
    	var hideDimmer = function(){
    		this.dimmer.fadeOut('fast', function() {
	            $(this).remove();
	        });
    	};
    	var updateStyle = function(){
    		this.lis.removeClass('selected');
        	this.lis.eq(index).addClass('selected').addClass('loaded');
    	};
    	var updateImg = function(){
    		var that = this;
	        img.attr({
	            width: this.imgW,
	            height: this.imgH
	        });
	        this.targetCon.find('img').fadeOut('fast', function() {
	            $(this).remove();
	            that.targetCon.append(img);
	        });
    	};
    	var loadImg = function(){
    		var that = this,
	            img = new Image();
	        if (loaded) {
	            this.updateImg($(img));
	            this.updateStyle(index);
	        } else {
	            this.showDimmer();
	            img.onload = function() {
	                that.hideDimmer();
	                that.updateImg($(img));
	                that.updateStyle(index);
	            }
	            img.onerror = function() {
	                that.hideDimmer();
	            }
	        }
	        img.src = url;
    	};
    	var positionFilter = function(){
    		var w = this.setting.zoomFilterW,
	            h = this.setting.zoomFilterH,
	            sw = this.setting.showAreaW,
	            sh = this.setting.showAreaH,
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
	        this.zoomFilter.css({
	            left: left,
	            top: top
	        });
	        this.zoomInImg.css({
	            left: 0 - left,
	            top: 0 - top
	        });
    	};
    	var bind = function(){
    		var that = this;
	        this.lis.click(function(event) {
	            var index = $(this).index(),
	                url = $(this).attr('data-url'),
	                zoomUrl = $(this).attr('data-zoom'),
	                loaded = $(this).hasClass('loaded');
	            that.loadImg(url, index, loaded);
	            that.zoomInImg.attr('src', zoomUrl);
	        });
	        this.zoomDimmer.mouseenter(function(event) {
	            that.zoomFilter.fadeIn('fast');
	            that.zoomIn.fadeIn('fast');
	        }).mouseleave(function(event) {
	            that.zoomFilter.fadeOut('fast');
	            that.zoomIn.fadeOut('fast');
	        }).mousemove(function(event) {
	            that.positionFilter(event.offsetX, event.offsetY)
	        });
    	};
	}

	$.fn.gallaryZoom = function(){
		var gallaryZoom = new GallaryZoom();
	};

	$.fn.fixedtab = function(tab,Con,sec){
		var fixedtab = new FixedTab(tab,Con,sec);
	};
})(jQuery);

$(function(){
	$().fixedtab(".moreInfoBar",".moreInfoCon",".moreInfoSec");
});















