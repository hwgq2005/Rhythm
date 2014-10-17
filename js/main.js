/**
 * @authors H君 (qq:262281610)
 * @date    2014-10-17 17:14:05
 * @version 1.0
 */
;
(function($) {
	$.fn.Rhythm = function(options) {
		// window.onload = function() {
		// 	var gameNum=1;
		// 	var startGame=function(){
		// 		$('.startGame').css(
		// 			'background-image','url(./images/down'+gameNum+'.png)'
		// 		);
		// 		gameNum--;
		// 		if(gameNum == -1){
		// 			$('.startGame').hide();
		// 			Game();
		// 			startGame=null;
		// 		}
		// 		setTimeout(startGame, 1000)
		// 	}
		// 	startGame();	
		// }
		// 默认参数

		$.fn.Rhythm.defaults = {
			speed :100,    	//下落速度
			startT :1000,  	//每个目标出现的时间
			Countdown :10  	//设置游戏时长
		};
		var opts = $.extend({}, $.fn.Rhythm.defaults, options);
		return this.each(function() {
			var Element=$(this),				// 调用本身
				targetBtn = $('#target-btn'),   // 按钮父类
				sizey = 4, 						// 背景由小变大
				scroe = 0, 						// 分数
				number, 						// 目标数
				sound, 							// 音乐控制
				num = 0,						// 个数
				sy = 10;   						// Y轴速度
			var _scroeH = '<div id="score" class="score">分数：<span>' + scroe + '</span></div>',
				_countdowmH = ' <div class="countdown">' + opts.Countdown + '</div>';
			Element.append(_scroeH).append(_countdowmH);
			var Wrapper = {
				//随机选择轨道
				randoms: function() {
					num++;
					number = (1 + Math.random() * (4 - 1)).toFixed(0);
					var track = $('.track' + number);
					var _html = '<div class="target" data-action="' + number + '" id="target' + num + '" ></div>';
					track.append(_html);
					return num;
				},
				//目标下落
				move: function() {
					var idNum = Wrapper.randoms();
					var y = 0; //y轴
					var size = 0; //y轴
					var thisH = $('.btn' + number).offset().top,
						btnH = targetBtn.find('.btn').height() / 2;
					var time = setInterval(function() {
						y += sy;
						size += sizey;
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
					}, opts.speed)

				},
				//事件控制
				events: function() {
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
								scroe++;
								$('#score').find('span').html(scroe);
							}
						})
					}
					if (touchStatus) {
						targetBtn.on('touchstart', '.btn', Eventfun);
					} else {
						targetBtn.on('click', '.btn', Eventfun);
					}
					Wrapper.music();
				},
				//游戏开始
				start: function() {
					var lastNum = Wrapper.move();
					if (opts.Countdown == 1) {
						var _html = '<a href="javascript:;" class="close">x</a>' + '<p>哇塞</p>' + '<P>恭喜您</P>' + '<P >获得' + scroe + '分</P>';
						// +'<div class="line" ></div>'
						// +'<p class="tip">提示:请您将本得分页面截图，并发'
						// +'送到“本人”微信公众号参'
						// +'与排名，我们将在8月29日公布最'
						// +'终排名奖项'
						// +'</p>';
						$('.msg').html(_html).show();
						$('.mask').show();
						$('.msg').on('click', 'a.close', function(event) {
							$(this).parent().html('').hide();
							$('.mask').hide();
							window.location=window.location;
						});

						Wrapper.start = null;
						sound.pause();
					}
					setTimeout(Wrapper.start, opts.startT)
				},
				//游戏时间倒计时
				cuntdown: function() {
					Wrapper.start();
					Wrapper.events();
					var _CountdownT = function() {
						opts.Countdown--;

						if (opts.Countdown == -1) {
							_CountdownT = null;
						} else {
							$('.countdown').html(opts.Countdown);
						}
						setTimeout(_CountdownT, 1000)
					};
					_CountdownT();
				},
				//音乐
				music: function() {
					sound = new Howl({
						urls: ['./绿光.mp3']
					}).play();
				},
				//开场倒数秒数
				init:function(){
					var gameNum=5;
					var startGame=function(){
						$('.startGame').css(
							'background-image','url(./images/down'+gameNum+'.png)'
						);
						gameNum--;
						if(gameNum == -1){
							$('.startGame').hide();
							Wrapper.cuntdown();
							startGame=null;
						}
						setTimeout(startGame, 1000)
					}
					startGame();	
				}
			}
			Wrapper.init();
		})
	}
})(Zepto)