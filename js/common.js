$(function(){
	// Mobile Ui 
	
	var mobile = {
		open : function(){
			$('.mo_menu').stop().animate({'left':'0'},400,'easeInOutQuad');
		},
		close : function(){
			$('.mo_menu').stop().animate({'left':'200%'}, 400, 'easeInOutQuad');
		},
		down : function(target){
			$(target).addClass('on');
			$(target).next().stop().slideDown(400,'easeInOutQuad');
			
		},
		up : function(target){
			$(target).removeClass('on');
			$(target).next().stop().slideUp(400, 'easeInOutQuad');
		},
		siblingsUp : function(target){
			$(target).parent().siblings('li').children('a').removeClass('on');
			$(target).parent().siblings('li').children('ul').stop().slideUp(400, 'easeInOutQuad');
		},
		bgOn : function(){
			$('.mbg').stop().fadeIn(400);
		},
		bgOff : function(){
			$('.mbg').stop().fadeOut(400);
		}
	}

	
	$('.mo_open').on('click',function(){
		console.log('clicked')
		mobile.open();
		mobile.bgOn();
		//$('html,body').css({'overflow':'hidden' , 'height' : '100%'});
		//$.fn.fullpage.setAutoScrolling(false);
	});
	$('.mo_close').on('click',function(){
		mobile.close();
		mobile.bgOff();
		//$('html,body').css({'overflow':'visible' , 'height' : 'initial'});
	});

	$('.mgnb .depth1 > li > a').on('click',function(){
		mobile.siblingsUp(this);
		if($(this).hasClass('on')){
			mobile.up(this);
		}else{
			mobile.down(this);
		}
	});


	$(window).scroll(function () {
		var height = $(document).scrollTop();	
		//var target = $('.main_visual').height();
		if( height > 90 ) {
			$('.header').addClass('on');
		} else {
			$('.header').removeClass('on');
		}
	}); 
	
	$('.open_detail').on('click', function(){
        $('.pop_detail').stop().fadeIn(400);
    });

	$('.mo_menu .main_cont .gnb ul > li > a ').on('click',function(){
		closeMenu();	
	});
	
});

function CountDownTimer(dt) {
	var id = ".count";
	var end = new Date(dt);

	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;
	var timer;

	function showRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {

		clearInterval(timer);

		$(id).find("span").eq(0).html("00");
		$(id).find("span").eq(1).html("00");
		$(id).find("span").eq(2).html("00");
		$(id).find("span").eq(3).html("00");
		
		return;

		}
		var days = Math.floor(distance / _day);
		var hours = Math.floor((distance % _day) / _hour);
		var minutes = Math.floor((distance % _hour) / _minute);
		var seconds = Math.floor((distance % _minute) / _second);
		var vdays = String("0"+days).substring(String("0"+days).length-2,String("0"+days).length);
		var vhours = String("0"+hours).substring(String("0"+hours).length-2,String("0"+hours).length);
		var vminutes = String("0"+minutes).substring(String("0"+minutes).length-2,String("0"+minutes).length);
		var vseconds = String("0"+seconds).substring(String("0"+seconds).length-2,String("0"+seconds).length);
		$(id).find("span").eq(0).html(vdays);
		$(id).find("span").eq(1).html(vhours);
		$(id).find("span").eq(2).html(vminutes);
		$(id).find("span").eq(3).html(vseconds);
		//cTimer(seconds);
	}
	timer = setInterval(showRemaining, 1000);
}

function closePop(Popname){
    $('.'+Popname).stop().fadeOut(400);
	//if( Popname == 'pop_detail' )  { $("html, body").removeClass("not_scroll"); }
    //document.getElementById(Popname).style.display = 'none';
	//document.getElementById('player').pause();
}

function activeAllMenu(str){
	//$('.' + str).stop().animate({'right':'0'},400);	
	$('.' + str).addClass("on");
}

function closeMenu(){
	$('.mo_menu').stop().animate({'left':'200%'}, 400);
	$('.mbg').stop().fadeOut(400);
}

function moMenuClick(target) {	
	closeMenu();				
	scroll_page(target);		

}

function scroll_page(target){
	var value = $('.' + target).offset().top;
	var basic = 90;
	var w = $(window).innerWidth();
	
	$('html').animate({'scrollTop' : value-basic}, 800, 'easeInOutQuad');
}	

/* 삭제하지 말것 */
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

/*
function refresh_captcha(){
	document.getElementById("capt_img").src="/include/captcha.php?waste="+Math.random(); 
	return false;
}
*/

/* - - - - - - - - - */ 