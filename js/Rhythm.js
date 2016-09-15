/**
 * @authors H君 (qq:262281610)
 * @date    2014-10-17 17:14:05
 * @version 1.0
 */
!(function($){

	var Rhythm = function(element,options){
		this.options = options;
		this.element = $(element);
		this.targetBtn = $('#target-btn');
		this.sizey = 4; // 背景由小变大
		this.scroe = 0; // 分数
		this.number = null; // 目标数
		this.sound = null; // 音乐控制
		this.num = 0; // 个数
		this.sy = 10; // Y轴速度

		this.init(this.element);
	}

	Rhythm.prototype.init=function(element){
		var _self = this;
		var gameNum = 5;
		var startGame = function() {
			$('.startGame').css(
				'background-image', 'url(./images/down' + gameNum + '.png)'
			);
			gameNum--;
			if (gameNum == -1) {
				$('.startGame').hide();
				var _scroeH = '<div id="score" class="score">分数：<span>' + _self.scroe + '</span></div>',
				_countdowmH = ' <div class="countdown">' + _self.options.Countdown + '</div>';
				element.append(_scroeH).append(_countdowmH);
				_self.cuntdown();
				startGame = null;
			}
			setTimeout(startGame, 1000)
		}
		startGame();
	}

	//游戏开始
	Rhythm.prototype.start=function() {
		var _self = this;
		
		var startAuto = function(){
			_self.move();
			if (_self.options.Countdown == 1) {
				var _html = '<a href="javascript:;" class="close">x</a>' + '<p>哇塞</p>' + '<P>恭喜您</P>' + '<P >获得' + _self.scroe + '分</P>';
				$('.msg').html(_html).show();
				$('.mask').show();
				$('.msg').on('click', 'a.close', function(event) {
					$(this).parent().html('').hide();
					$('.mask').hide();
					window.location = window.location;
				});

				_self.start = null;
				this.sound.pause();
			}
			setTimeout(startAuto, _self.options.startT)
		}
		startAuto()
		
	}

	//随机选择轨道
	Rhythm.prototype.randoms=function() {
		var _self = this;
		_self.num++;
		_self.number = (1 + Math.random() * (4 - 1)).toFixed(0);
		var track = $('.track' + _self.number);
		var _html = '<div class="target" data-action="' + _self.number + '" id="target' + _self.num + '" ></div>';
		track.append(_html);
		return _self.num;
	}

	//目标下落
	Rhythm.prototype.move=function() {
		var _self = this;
		var idNum = _self.randoms();
		var y = 0; //y轴
		var size = 0; //y轴
		var thisH = $('.btn' + _self.number).offset().top,
			btnH = _self.targetBtn.find('.btn').height() / 2;
		var time = setInterval(function() {
			y += _self.sy;
			size += _self.sizey;
			$('#target' + idNum).css({
				'top': y + 'px',
				'background-size': size + '%'
			});
			if (y > thisH + btnH) {
				var shorT = setTimeout(function() {
					$('#target' + idNum).remove();
					shorT = null;
				}, 200)
				clearInterval(time);
			}
			time = null;
		}, _self.options.speed)

	}


	Rhythm.prototype.events=function() {
		var _self = this;
		var touchStatus = false,
			u = navigator.userAgent;
		if (u.indexOf('iPhone') > -1 || u.indexOf('iPod') > -1 || u.indexOf('Android') > -1) {
			touchStatus = true;
		}
		var Eventfun = function() {
			var _left = $(this);
			var index = _left.index() + 1;
			var subTarget = $('.track' + index).find('.target');
			subTarget.each(function(page, elem) {
				if ($(elem).offset().top > _left.offset().top - _left.height() / 2 - 30) {
					_left.addClass('btnHigh');
					$(elem).remove();
					$('.track' + index).addClass('trackHigh');
					setTimeout(function() {
						_left.removeClass('btnHigh');
						$('.track' + index).removeClass('trackHigh');
					}, 100)
					_self.scroe++;
					$('#score').find('span').html(_self.scroe);
				}
			})
		}
		if (touchStatus) {
			_self.targetBtn.on('touchstart', '.btn', Eventfun);
		} else {
			_self.targetBtn.on('click', '.btn', Eventfun);
		}
		// _self.music();
	}

	//音乐
	Rhythm.prototype.music=function() {
		var _self = this;
		this.sound = new Howl({
			urls: [_self.options.musicUrl]
		}).play();
	}

	Rhythm.prototype.cuntdown=function(){
		var _self = this;
		_self.start();
		_self.events();
		var _CountdownT = function() {
			_self.options.Countdown--;

			if (_self.options.Countdown == -1) {
				_CountdownT = null;
			} else {
				$('.countdown').html(_self.options.Countdown);
			}
			setTimeout(_CountdownT, 1000)
		};
		_CountdownT();
	}

	$.fn.Rhythm = function(options) {
	
		// 默认参数
		var element=this;
		var opts = $.extend({}, $.fn.Rhythm.defaults, options);
		return this.each(function() {
			 new Rhythm(this, options);
		})
	}


	$.fn.Rhythm.defaults = {
		musicUrl:'',	//音乐地址
		speed :100,    	//下落速度
		startT :1000,  	//每个目标出现的时间
		Countdown :10  	//设置游戏时长
	};

}(Zepto))