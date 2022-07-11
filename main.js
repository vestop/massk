$('.story-slideshow').slick({
  dots: false,
  arrows: false,
  infinite: true,
  pauseOnHover: false,
  pauseOnFocus: true,
  pauseOnDotsHover: true,
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

$('.product-list').slick({
  dots: false,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 300,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
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
  autoplaySpeed: 3000,
  speed: 500,
  autoplay: true,
  nextArrow: '<button type="button" class="slick-next"></button>',
  prevArrow: '<button type="button" class="slick-prev"></button>',
});

window.addEventListener('load', () => {
  const preload = document.querySelector('.preload');
  setTimeout(function () {
    preload.classList.add('fGhjj');
  }, 1000);
});
