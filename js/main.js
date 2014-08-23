/**
 *
 * @authors H君 (262281610@qq.com)
 * @date    2014-08-14 09:47:50
 * @version $Id$
 */

(function($) {

	window.onload = function() {
		var gameNum=5;
		var startGame=function(){
			$('.startGame').css(
				'background-image','url(./images/down'+gameNum+'.png)'
			);
			gameNum--;
			if(gameNum == -1){
				$('.startGame').hide();
				Game();
				startGame=null;
			}
			setTimeout(startGame, 1000)
		}
		startGame();	
	}
	var Game = function() {
		var targetBtn = $('#target-btn'), //按钮父类
			speed = 1000, //下落速度
			sy = 10, //y轴速度
			sizey = 4, // 目标降落距离
			number, //目标数
			scroe = 0, //分数
			num = 0, //个数
			startT, //目标出现时间
			Countdown = 10; // 倒计时
		var init = function() {
			var _scroeH = '<div id="score" class="score">分数：<span>' + scroe + '</span></div>',
				_countdowmH = ' <div class="countdown">' + Countdown + '</div>';
			$('.game').append(_scroeH).append(_countdowmH);
		}
		init();
		var Wrapper = {
			randoms: function() {
				num++;
				number = (1 + Math.random() * (4 - 1)).toFixed(0);
				var track = $('.track' + number);
				var _html = '<div class="target" data-action="' + number + '" id="target' + num + '" ></div>';
				track.append(_html);
				return num;
			},
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
				}, 100)
				return {
					Track: idNum
				};
			},
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
			start: function() {
				var lastNum=Wrapper.move();

				if (Countdown == 1) {
					var _html='<a href="javascript:;" class="close">x</a>'
								+'<p>哇塞</p>'
								+'<P>恭喜您</P>'
								+'<P >获得'+scroe+'分</P>'
								+'<div class="line" ></div>'
								+'<p class="tip">提示:请您将本得分页面截图，并发'
								+'送到“龙湖锦艺城”微信公众号参'
								+'与排名，我们将在8月29日公布最'
								+'终排名奖项'
								+'</p>';
					setTimeout(function(){
						$('.msg').html(_html).show();
						$('.mask').show();
						$('.msg').on('click', 'a.close', function(event) {
							$(this).parent().html('').hide();
							$('.mask').hide();
							
						});
					},5000)
					Wrapper.start = null;
				}
				setTimeout(Wrapper.start, 1000)
			},
			cuntdown: function() {
				Wrapper.start();
				Wrapper.events();
				var _CountdownT = function() {
					Countdown--;

					if (Countdown == -1) {
						_CountdownT = null;
					} else {
						$('.countdown').html(Countdown);
					}
					setTimeout(_CountdownT, 1000)
				};
				_CountdownT();
			},
			music: function() {
				var sound = new Howl({
					urls: ['./绿光.mp3']
				}).play();
			}
		}
		Wrapper.cuntdown();

	}
}(Zepto))