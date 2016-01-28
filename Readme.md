文档说明
====================
插件说明：
-
此插件支持`移动端` 、`PC端`，引入 `<Zepto.js> `或`<jQuery.js> `即可。
DOM结构
-
	<div class="game" id="game">
		<img src="images/main.jpg"  />
		<img src="images/logo2.png"  class="logo" />
		<div class="track track1" ></div>			
		<div class="track track2"></div>
		<div class="track track3">	</div>
		<div class="track track4"></div>
		<div class="collection-btn" id="target-btn">
			<div class="btn btn1 "></div>
			<div class="btn btn2 "></div>
			<div class="btn btn3 "></div>
			<div class="btn btn4 "></div>
		</div>
		<div class="startGame"></div>
		<div class="msg"></div>
	</div>

JS调用
-
	$('#game').Rhythm({
		musicUrl:"xxx.mp3",	//音乐地址
		speed :100, 	    //下落速度
		startT :1000, 	    //每个目标出现的时间
		Countdown :60	    //设置游戏时长
	});
参数配置
-
	musicUrl:"xxx.mp3",	//音乐地址
    speed :100, 	    //下落速度
	startT :1000, 	    //每个目标出现的时间
	Countdown :60   	//设置游戏时长


该插件仅供学习，不断完善中。
