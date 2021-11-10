$(function(){
	const $slider = $('.about__slider');
	const $sliderDesc = $('.about__desc');
	const $sliderBtn = $('.about__btn');
	const $navItem = $('.about__navItem');

	$slider.slick({
		slidesToShow: 1,
		fade: true,
		prevArrow: '.about__btn--prev',
		nextArrow: '.about__btn--next',
		draggable: false,
		swipe: false,
		asNavFor: $sliderDesc
	});

	$sliderDesc.slick({
		slidesToShow: 1,
		fade: true,
		arrows: false,
		draggable: false,
		swipe: false,
		adaptiveHeight: true
	});

	$navItem.on('click', function(e) {
		if(!isClickedNavItem) {
			let slideIndex = $(this).data('slick-dot');

			$navItem.removeClass('about__navItem--active');
			$(this).addClass('about__navItem--active');

			$slider.slick('slickGoTo', slideIndex);
		}
	});

	$sliderBtn.on('click', function(e) {
		let slideIndex = $slider.slick('slickCurrentSlide');

		$navItem.removeClass('about__navItem--active');
		$('.about__nav').find(`[data-slick-dot="${slideIndex}"]`).addClass('about__navItem--active');
	});

	$('.navigateLink').on('click', function(e) {
		e.preventDefault();

		$('.nav__bar').removeClass('nav__bar--open');
        $('.nav__body').slideUp(300).removeClass('nav__body--active');

		let target = $(this).attr('href');
		
		$('html').animate({
			scrollTop: $(target).offset().top - 72
		}, 700);
	});

	$('.nav__bar').on('click', function() {
	 	$(this).toggleClass('nav__bar--open');
        $('.nav__body').slideToggle(300).toggleClass('nav__body--active');
    });

	let offset = window.pageYOffset;

	function checkOffset() {
		offset = window.pageYOffset;
		let header = $('.header');

		if (offset > 550) {
		  $('body').css('marginTop', '92px');
		  header.addClass('header--fixed');
		} else {
		  $('body').css('marginTop', '0px');
		  header.removeClass('header--fixed');
		}
	}

	checkOffset();

	$(window).on('scroll', checkOffset);
});