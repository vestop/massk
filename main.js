$('.story-slideshow').slick({
  dots: false,
  arrows: false,
  infinite: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  pauseOnDotsHover: false,
  speed: 1500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 980,
      settings: {
        arrows: false,
      },
    },
  ],
});

$('.TestimonalList').slick({
  vertical: true,
  verticalSwiping: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  infinite: true,
  swipe: false,

  pauseOnHover: false,
  pauseOnFocus: false,
  pauseOnDotsHover: false,
  speed: 2500,
});

$('.product-list').slick({
  dots: false,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500,
  arrows: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
  ],
});

$('#menu').click(function () {
  $('#DropdownMenu').toggleClass('show');
});

$('.header-menu').click(function () {
  $('.sidebar-menu').addClass('show'), $('.PageOverlay').addClass('is-visible');
});
$('.Drawer__Close').click(function () {
  $('.sidebar-menu').removeClass('show'), $('.PageOverlay').removeClass('is-visible');
});

$('#menu1').mouseover(function () {
  $('#DropdownMenu1').attr('aria-hidden', 'false');
});

$('.top-header').mouseleave(function () {
  $('#DropdownMenu1').attr('aria-hidden', 'true');
});

$('.Product__GallerySlideshow').slick({
  dots: false,
  infinite: true,
  slidesToShow: 1,

  speed: 500,
  autoplay: false,
  nextArrow: '<button type="button" class="slick-next"></button>',
  prevArrow: '<button type="button" class="slick-prev"></button>',
});

window.addEventListener('load', () => {
  const preload = document.querySelector('.preload');
  setTimeout(function () {
    preload.classList.add('fGhjj');
  }, 1000);
});

$('.Products').slick({
  vertical: true,
  swipe: false,
  speed: 0,

  cssEase: 'linear',
  dots: false,
  slidesToShow: 1,

  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  asNavFor: '.Options',
});

$('.Options').slick({
  dots: false,
  slidesToShow: 9,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  asNavFor: '.Products',
  focusOnSelect: true,
});
