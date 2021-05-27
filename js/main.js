jQuery(function ($) {
  'use strict';

  // Navigation Scroll
  $(window).scroll(function (event) {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    $('.navbar-collapse').find('.scroll a').each(function () {
      contentTop.push($($(this).attr('href')).offset().top);
      contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
    })
    $.each(contentTop, function (i) {
      if (winTop > contentTop[i] - rangeTop) {
        $('.navbar-collapse li.scroll')
          .removeClass('active')
          .eq(i).addClass('active');
      }
    })
  });

  $('.navbar-collapse ul li a').on('click', function () {
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
    return false;
  });

  // Initiate WOW
  var wow = new WOW({
      boxClass: 'wowload',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }
  );
  wow.init();

  $('.carousel').swipe({
    swipeLeft: function () {
      $(this).carousel('next');
    },
    swipeRight: function () {
      $(this).carousel('prev');
    },
    allowPageScroll: 'vertical'
  });

  // Google Map
  var latitude = $('#google-map').data('latitude');
  var longitude = $('#google-map').data('longitude');

  function initialize_map() {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      navigationControl: true,
      mapTypeControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    };

    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });

    // add information window
    var infowindow = new google.maps.InfoWindow({
      content: '<div class="info"><strong>Quedex Ltd</strong><br/>are here:<br/><br/>4th Floor, Radius House,<br/>51 Clarendon Road,<br/>Watford,<br/>Hertfordshire WD17 1HP<br/>UK</div>'
    });

    // add listener for a click on the pin
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });

    $(document).getElementById('links').onclick = function (event) {
      event = event || window.event;
      var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
      blueimp.Gallery(links, options);
    };
  }

  google.maps.event.addDomListener(window, 'load', initialize_map);

  // Portfolio Filtering - Isotope
  var $container = $('.filter-container');

  // Add this for a fade-in/fade-in transition:
  //transitionDuration: '0.8s',
  //  // only opacity for reveal/hide transition
  //  hiddenStyle: {
  //  opacity: 0
  //},
  //visibleStyle: {
  //  opacity: 1
  //}

  $container.isotope({
    itemSelector: '.filter-item',
    filter: '*',
    layoutMode: 'fitRows',
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    },
    masonry: {
      gutterWidth: 2
    }
  });

  $('#filter-works a').click(function () {
    $('#filter-works li').removeClass('active');
    $(this).parent('li').addClass('active');
    var selector = $(this).attr('data-filter');

    $container.isotope({filter: selector});
    return false;
  });

  $(document).ready(function ($) {
    // Add here
  });

  $(window).load(function () {
    $container.isotope({filter: '*'});
  });

});






