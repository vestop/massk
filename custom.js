/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

 function updateHistoryState(variantId) {
  if (!history.replaceState) {
    return
  }
  var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variantId;
  window.history.replaceState({
    path: newUrl
  }, '', newUrl);
}

(function () {

  detectCustomSadle();

  $(document).click(function(e) {
    var target = e.target;

    // Search related vars
    var $searchInput = $('.HorizontalList__Item .Search__Form .Search__Input');
    var $searchSubmit = $('.HorizontalList__Item .Search__Form .Search__Submit');
    var isExpanded = $searchInput.hasClass('expanded');

    // If mobile, use different search input and submit
    if ($searchInput.is(':hidden')) {
      $searchInput = $('.Drawer__Header .Search__Form .Search__Input');
      var $searchSubmit = $('.Drawer__Header .Search__Form .Search__Submit');
    }

    // Check if user has clicked on search bar
    if ($(target).hasClass('Search__Submit') || $(target).hasClass('Search__Input')) {
      // Check if input has some values
      if ($searchInput.val().length == 0 || !$searchInput.hasClass('expanded')) {
        e.preventDefault();
      }
    }

    if ($searchInput.is(target) || $searchSubmit.is(target)) {
      if (!$searchInput.hasClass('expanded')) {
        $searchInput.addClass('expanded');
      }
    } else {
      if ($searchInput.hasClass('expanded')) {
        $searchInput.removeClass('expanded');
      }
    }
  });

  $(".dropdown ul.dropdown_list").each(function(){
    if ($(this).children().length == 0) {
      $(this).remove();
    } else {
      var menu_item = $(this).attr('id');
      menu_item = capitalizeFirst(menu_item.replace("dropdown--", ""));

      // Mobile dropdown
      $dropdown = $(".SidebarMenu__Nav--primary .Collapsible:contains("+menu_item+")");
      var dropdown_html = "<button class=\"Collapsible__Button Heading u-h6\" data-action=\"toggle-collapsible\" aria-expanded=\"false\">";
      dropdown_html += menu_item
      dropdown_html += "<span class=\"Collapsible__Plus\"></span></button>";
      dropdown_html += "<div class=\"Collapsible__Inner\">";
      dropdown_html += "<div class=\"Collapsible__Content\">";

      $(this).find("li").each(function() {
        dropdown_html += "<div class=\"Collapsible Collapsible__Half\">";
        dropdown_html += "<a href="+$(this).find("a").attr('href')+" class=\"Button u-h7\">";
        dropdown_html += "<img src="+$(this).find("img").attr('src')+"><span>"+$(this).find("span").text()+"</span>";
        dropdown_html += "</a></div>";
      });

      dropdown_html += "</div></div>";
      $dropdown.html(dropdown_html);
    }
  });

  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $(document).on('click', '.OptionColors .ColorSwatch', function(e) {
    var color = $(e.target).attr('data-value');
    var value = color;
    var $parent = $(e.target).parents('.ProductForm__Option');

    // Add size to value
    if ($('.Popover__Value.is-selected').length) {
      var size = $('.Popover__Value.is-selected').attr('data-value');
      value = size + " / " + color;
    }

    // Select chosen color
    $parent.find('.ColorSwatch.is-selected').removeClass('is-selected');
    $(e.target).addClass('is-selected');

    // Change select option
    var current_sku = $(`.ProductForm__Option.no-js select option[data-value="${value}"]`).attr('data-sku');
    var id = $(`.ProductForm__Option.no-js select option[data-value="${value}"]`).val();
    $(".ProductForm__Option.no-js select").val(id);
    updateHistoryState(id);
    $('.ProductMeta__Code .product-sku').text(current_sku);

    var current_price = $(`.ProductForm__Option.no-js select option[data-value="${value}"]`).attr('data-price');
    
    $('.ProductMeta__PriceList .Price').text(current_price);

    // Show/hide custom saddles
    if (allowed_sku.indexOf(current_sku) != -1) {
      $('.Collapsible[data-tab-1]').removeClass('hidden');
    } else {
      $('.Collapsible[data-tab-1]').addClass('hidden');
    }

    productGallery(color);
  });

  $(document).on('click', '.Popover__ValueList .Popover__Value', function(e) {
    var size = $(e.target).attr('data-value');
    var value = size;
    var $parent = $(e.target).parents('.ProductForm__Option');

    // Add color to value
    if ($('.ColorSwatch.is-selected').length) {
      var color = $('.ColorSwatch.is-selected').attr('data-value');
      value += " / " + color;
    }

    // Change select option
    var current_sku = $(`.ProductForm__Option.no-js select option[data-value="${value}"]`).attr('data-sku');
    var id = $(`.ProductForm__Option.no-js select option[data-value="${value}"]`).val();
    updateHistoryState(id);
    $(".ProductForm__Option.no-js select").val(id);
    $('.ProductMeta__Code .product-sku').text(current_sku);
  });

  function detectCustomSadle()
  {
    var value = $('.OptionColors .ColorSwatch.is-selected').attr('data-value');
    var current_sku = $(`.ProductForm__Option.no-js select option[data-value="${value}"]`).attr('data-sku');

    if (typeof allowed_sku !== 'undefined') {
      // Show/hide custom saddles
      if (allowed_sku.indexOf(current_sku) != -1) {
        $('.Collapsible[data-tab-1]').removeClass('hidden');
      } else {
        $('.Collapsible[data-tab-1]').addClass('hidden');
      }
    }
  }

  // Gallery show/hide
  var first_access = true;
  function productGallery(color) {
    if (typeof multiColors != "undefined") {
      if (multiColors) {
        if (color != undefined) {
          var value_l = color.toLowerCase();

          if ($(window).width() >= 1008) {
            // For dekstop
            $(`.Product__SlideItem:not(.hidden)`).addClass('hidden');
            $(`.Product__SlideshowNavImage:not(.hidden)`).addClass('hidden');
            $(`.Product__SlideItem[data-img-group='${value_l}']`).removeClass('hidden');
            $(`.Product__SlideshowNavImage[data-img-group='${value_l}']`).removeClass('hidden');
          }
          else {
            // For smartphones
            var index = parseInt($(`.Product__SlideItem[data-img-group='${value_l}']`).first().index());
            var nth_index = index + 1;
            var offset = parseInt(index) * 100;

            if (first_access) {
              first_access = false;
              $('.Product__Slideshow.flickity-enabled').flickity();
            }
            $('.Product__Slideshow.flickity-enabled').flickity('select', index);
            /*
            $('.flickity-slider').css('transform', `translateX(-${offset}%)`);
            $(`.flickity-page-dots .dot.is-selected`).removeClass('is-selected');
            $(`.flickity-page-dots .dot:nth-child(${nth_index})`).addClass('is-selected');
            */
            // $(`.flickity-page-dots .dot:nth-child(${index})`).trigger('mousedown');
          }
        }
      }
    }
  }
  productGallery($(".OptionColors .ColorSwatch.is-selected").attr('data-value'));

  $(document).on('click', 'a.CurrencySelector__Select', function(e) {
    e.preventDefault();
  });

  $(document).on('click', '.CurrencyList__Item .Link.Link--secondary', function(e) {
    e.preventDefault();
    var currency = $(e.target).text();
    $parentAnchor = $(e.target).parent().parent().parent().parent().find('a.menu_link');
    var prev_currency = $parentAnchor.html().substring(0, 3);

    $('select.CurrencySelector__Select').val(currency);
    $('select.CurrencySelector__Select').trigger('click');
    var prev_text = $parentAnchor.html().substr(3);
    prev_text = currency + prev_text;
    $parentAnchor.html(prev_text);
    $(e.target).text(prev_currency);
  });

  function initCurrency() {
    $parentAnchor = $('a.CurrencySelector__Select');
    var selectCurrent = $('select.CurrencySelector__Select option[selected]').val();
    var prev_currency = $parentAnchor.html().substring(0, 3);
    var currency = $parentAnchor.val();

    if (selectCurrent != prev_currency)
    	exchangeCurrencies(prev_currency, currency);
  }
  initCurrency();

  function exchangeCurrencies(old_cur, new_cur) {
    $mainElem = $('a.CurrencySelector__Select');
    $dropdownElem = $('.CurrencyList__Item .DropdownMenu ul');

    $dropdownElem.find('li').each(function(i, val) {
      $current = $(this).find('span');
      if ($current.find('span:contains("'+new_cur+'")')) {
        $current.text(old_cur);
        $current.attr('value', old_cur);

        var mainHtml = $mainElem.html().substr(3);
        mainHtml = new_cur + mainHtml;
        $mainElem.html(mainHtml);
        $mainElem.attr('value', new_cur);
        return false;
      }
    });
  }

  $("input.uq_1").change(function() {
    $("input.uq_1").prop('checked', false);
    $(this).prop('checked', true);
  });

  $(window).scroll(function() {
    var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
    var top_of_screen = $(window).scrollTop();

    $('.flyin:not(.done)').each(function() {
      var top_of_element = $(this).offset().top;
      var bottom_of_element = $(this).offset().top + $(this).outerHeight();

      if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
        // The element is visible
        $(this).addClass('done');
      }
    });
  });

  $(window).resize(function() {
    switchImageText_resposnive();
    rearrange();
  });

  function switchImageText_resposnive()
  {
    if ($(window).width() < 1006) {
      if ($('.grid--full.featured-2-wrapper > div:first-child').hasClass('feature-2-text'))
      	$('.grid--full.featured-2-wrapper .grid__half.feature-2-text').appendTo('.grid--full.featured-2-wrapper');
    } else {
      if ($('.grid--full.featured-2-wrapper > div:first-child').hasClass('featured-images'))
        $('.grid--full.featured-2-wrapper .grid__half.featured-images').appendTo('.grid--full.featured-2-wrapper');
    }
  }
  switchImageText_resposnive();

  // Mobile rearrange elements
  var desktop_last = true;
  function rearrange() {
    if ($(window).width() < 642) {
      if (desktop_last) {
      	$('.Footer__Block--newsletter').insertAfter('.Footer__Block--text');
        desktop_last = false;
      }
    } else {
      if (!desktop_last) {
        $('.Footer__Block--newsletter').insertAfter('.Footer__Block--links:last-child')
        desktop_last = true;
      }
    }
  }
  rearrange();

  if ($('body').hasClass('template-product')) {
    var splitString = "Specifications:";
    var description = $('.actual-description').html();

    if ($('html').attr('lang') == "it") {
      splitString = "Caratteristiche:";
    }

    if ($('html').attr('lang') == "es") {
      splitString = "Especificaciones:";
    }

    var actualDescription = '';
    var tabDescription = '';
  }


// CART RECYCLE CHECKBOX
$(document).ready(function() {
  $('body').on("change click", ".recycle_checkbox_js", function() {
    if(this.checked) {
      $(".recycle_button_js").prop('disabled', false);
    } else {
      $(".recycle_button_js").prop('disabled', true);
    }
  });
});
// CART DISCOUNT CHECKBOX
$(document).ready(function() {
  $('body').on("change click", ".recycle_old_saddle_js", function() {
    if(this.checked) {
      $(".recycle_old_saddle_CODE_js").slideDown();
      var data_discount = $(".recycle_old_saddle_CODE_js").attr("data-discount");
      $(".discount_CODE_input_js").val(data_discount);
    } else {
      $(".recycle_old_saddle_CODE_js").slideUp();
      $(".discount_CODE_input_js").val('');
    }
  });
});




// main page - delete "#"
if ( window.location.href == 'https://setzisaddles.com/#' ) {
  history.pushState(null, null, '/');
} else if ( window.location.href.slice(-1) == "#" ) {
  history.pushState(null, null,  window.location.href.substring(0, window.location.href.length - 1) );
}



})();
