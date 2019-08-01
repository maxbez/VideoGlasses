$(document).ready(function() {
	window.scrollBy(0, 1);
	$("input[name='phone']").mask(" +7 (999) 999 99 99");
	buildGallery(".clients-wrapper");
	
	var now = new Date();
	var y = now.getFullYear();
	var m = now.getMonth();
	var d = now.getDate() + 1;
	var h = 0;
	var min = 0;
	if(m == 12){
		m = 0; y++;
	}
	timestamp: new Date(y, m, d, h, min);
	$(".countdown").each(function (i, e){
		$(e).countdown({ timestamp: new Date(y, m , d, h, min) });
	});

	$(".slider-nav li").click(function() {
		var index = $(this).index();
		$(".slide").removeClass("active");
		$(".slide").eq(index).addClass("active");
		$(".slide .slider-nav li").removeClass("active");
		$(".slide.active .slider-nav li").eq(index).addClass("active");
	});

	$(document).scroll(function() {
		var top = $(document).scrollTop();
		console.log(top);
		if( top > 3700 && top < 4800 ) {
			var time = 300,
				dinamic = $(".reasons li");
			for(var j = 0; j < dinamic.length; j++) {
				dinamic.eq(j).delay(time).animate({
					"opacity": "1"
				}, 100);
				time += 300;
			}
		}
	});

	setInterval(function() {
		var index = $(".slide.active").index() + 1;
		if( index > 2 )
			index = 0;
		$(".slide").removeClass("active");
		$(".slide").eq(index).addClass("active");
		$(".slide .slider-nav li").removeClass("active");
		$(".slide.active .slider-nav li").eq(index).addClass("active");

	}, 5000);


});



$(".form-submit").submit(function(){
	var $name = $(this).find("input[name='name']"),
		$phone = $(this).find("input[name='phone']"),
		$type = $(this).find("input[name='type']");
	if( $name.val() === "Введите имя" || $phone.val() === "Введите телефон" ) {
		alert("Введите пожалуйста все данные!");
		return false;
	}
	formData = "name=" + $name.val() + "&phone=" + $phone.val() + "&type=" + $type.val();
	$.ajax({
		url: "submit.php",
		method: "POST",
		dataType: "html",
		data: formData
	}).done(function(data) {
		showConfirm(data);
	});
	return false;
});
function showConfirm(data) {
	$(".overlay").height($(document).height());
	$(".overlay").fadeIn();
	$(".message-block").fadeIn();
	$(".form-message .form-submit").fadeOut(0);
	$(".form-message h1").text(data)
}
$(".close-button").click(function() {
	$(".overlay").fadeOut(0);
	$(".message-block").fadeOut(0);
	$(".message-block .form-submit").fadeIn();
	$(".agreement").fadeOut();
	$(".form-message").fadeIn();
});
$(".form-call").click(function() {
	$(".overlay").height($(document).height());
	$(".overlay").css("display", "block");
	$(".message-block").fadeIn();
});
$(".phone-call").click(function() {
	$(".form-message h1").text("Обратный звонок");
	$(".form-message input[name='type']").val("Обратный звонок");
	$(".message-block .form-submit").fadeIn();
	$(".message-block .submit-button").text("Заказать звонок");
});
$(".product-call").click(function() {
	var title = $(this).parent().find("p").text();
	$(".form-message h1").text("Заказать продукт");
	$(".form-message input[name='type']").val(title);
	$(".message-block .form-submit").fadeIn();
	$(".message-block .submit-button").text("Заказать очки по акции");
});
$(".discount-call").click(function() {
	$(".form-message h1").text("Скидка 10%");
	$(".form-message input[name='type']").val("Скидка 10%");
	$(".message-block .form-submit").fadeIn();
	$(".message-block .submit-button").text("Заказать очки по акции");
});
$(".standart-call").click(function() {
	$(".form-message h1").text("Заказать очки");
	$(".form-message input[name='type']").val("Заказ очков");
	$(".message-block .form-submit").fadeIn();
	$(".message-block .submit-button").text("Заказать очки");
});
$(".agreement-call").click(function() {
	$(".form-message").fadeOut(0);
	$(".agreement").fadeIn();
});
function buildGallery(galleryName) {
	var numInt = 0,
		imgLeft = 0,
		maxLeft,
		i,
		index,
		offset = 20,
		$images = $(galleryName + " .client"),
		imgWidth = $images.width(),
		imgNum = $images.length,
		$imgContainer = $(galleryName + " .clients-inner");
	for(i = 0; i < $images.length; i++) {
		$images.eq(i).css('left', imgLeft + 'px');
		imgLeft += imgWidth + offset;
	}
	maxLeft = imgLeft - imgWidth - offset;
	$(galleryName + " .rbtn").click(function(){
		if(numInt === imgNum) 
			numInt = 0;
		for(i = 0; i < $images.length; i++) {
			if(numInt === i) {
				$images.eq(numInt).stop(false, true);
				$images.eq(numInt).animate({'left': maxLeft + 'px'}, 300);
			}
			else {
				$images.eq(i).stop(false, true);
				$images.eq(i).animate({'left': parseInt($images.eq(i).css('left'), 10) - (imgWidth + offset) + 'px'}, 300);
			}
		}
		numInt++;
	});
	$(galleryName + " .lbtn").click(function(){
		numInt--;
		if(numInt === -1) 
			numInt = imgNum - 1;
		for(i = 0; i < $images.length; i++) {
			if(numInt === i) {
				$images.eq(numInt).stop(false, true);
				$images.eq(numInt).animate({'left': 0}, 300);
			}
			else {
				$images.eq(i).stop(false, true);
				$images.eq(i).animate({'left': parseInt($images.eq(i).css('left'), 10) + (imgWidth + offset) + 'px'}, 300);
			}
		}
	});
}