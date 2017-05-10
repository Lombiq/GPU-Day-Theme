/* Coming Soon Js - Used in coming-soon.html files */
$(function() {
    "use strict";

    // Countdown
    if ($.fn.countdown) {
        $('.soon-countdown').countdown({
            until: new Date(2017, 10, 10), // 7th month = August / Months 0 - 11 (January  - December)
            format: 'DHMS',
            padZeroes: true
        });

		// $('.soon-countdown').countdown('pause'); // Pause to countdown to view on firebug
    }

    // Toogle Coming Soon Menu
    $('.soon-menu-toggle').on('click', function(e) {
        $(this).toggleClass('open');

        $('.soon-nav').slideToggle(400);

        e.preventDefault();
    });

    // removeHash without refresh
    function removeHash () { 
	    var scrollV, scrollH, loc = window.location;
	    if ("pushState" in history)
	        history.pushState("", document.title, loc.pathname + loc.search);
	    else {
	        // Prevent scrolling by storing the page's current scroll offset
	        scrollV = document.body.scrollTop;
	        scrollH = document.body.scrollLeft;

	        loc.hash = "";

	        // Restore the scroll offset, should be flicker free
	        document.body.scrollTop = scrollV;
	        document.body.scrollLeft = scrollH;
	    }
	}

    // Show related section when menu clicked
    var soonMenu =  $('.soon-menu'),
    	soonSections = $('.soon-sections');

    soonMenu.find('a').on('click', function() {
    	var target = $(this).attr('href'),
    		targetEl = $(target),
    		waitDur = 700;

		if ($(this).closest('li').hasClass('active')) {
			return;
		}

		if (!targetEl.length) {
			return;
		} 

		soonMenu.find('li.active').removeClass('active');
		$(this).closest('li').addClass('active');


		if(soonSections.find('.active').length) {
			soonSections.find('.active').removeClass('active');
		} else {
			waitDur = 100;
		}

		setTimeout(function() {
			targetEl.addClass('active');
		}, waitDur);
    });

    // Close Sections, hash, everything
	$('.close-sections-btn').on('click', function(e) {
		soonMenu.find('.active').removeClass('active');
		soonSections.find('.active').removeClass('active');

		removeHash();

		$('.soon-menu-toggle').removeClass('open');
        $('.soon-nav').slideUp(400);

		e.preventDefault();
	});
}); 