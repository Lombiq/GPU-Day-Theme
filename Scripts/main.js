/* ================================================
----------------- Simple Main.js ------------- */
(function ($) {
    "use strict";
    var Simple = {
        initialised: false,
        mobile: false,
        init: function () {

            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }

            // Call Simple Functions
            this.checkMobile();
            this.convertYouTubeUrlToEmbedMarkup();
            this.stopYouTubeVideoOnModalHidden();
            this.mobileMenuDropdownFix();
            this.menuOnClick();
            this.scrollToSchedule();
            this.scrollToTop();
            this.scrollAnimations();
            this.convertEmailAddresses();

            /* Call function if Owl Carousel plugin is included */
            if ($.fn.owlCarousel) {
                this.owlCarousels();
            }

        },
        convertEmailAddresses: function () {
            $(".speakerEmail").on("click", function () {
                var obfuscatedMailAddress = $(this).attr("href");
                var mailAddress = obfuscatedMailAddress.replace("(_at_)", "@");
                $(this).attr("href", mailAddress);
            });
        },
        checkMobile: function () {
            /* Mobile Detect*/
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.mobile = true;
            } else {
                this.mobile = false;
            }
        },
        convertYouTubeUrlToEmbedMarkup: function () {
            $(".event-part").find("#video").on("click", function () {
                var youTubeUrl = $(this).data("id");
                var modalWindowId = $(this).data("target");
                modalWindowId = modalWindowId.substring(1, modalWindowId.length);

                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = youTubeUrl.match(regExp);

                if (match && match[2].length === 11) {
                    $("." + modalWindowId).find(".embed-responsive-item").prop("src", "https://www.youtube.com/embed/" + match[2]);
                }
            });
        },
        stopYouTubeVideoOnModalHidden: function () {
            $(".embedYouTubeModal").on("hidden.bs.modal", function () {
                $(this).find(".embed-responsive-item").prop("src", "");
            });
        },
        mobileMenuDropdownFix: function () {
            if (typeof Modernizr === "object" && (Modernizr.mq("only all and (max-width: 767px)") || Modernizr.touchevents)) {
                $(".navbar-nav").not(".nav-overlay").find(".dropdown-toggle").on("click", function (e) {
                    var parent = $(this).closest("li");
                    // close all the siblings and their children
                    parent.siblings().removeClass("open").find("li").removeClass("open");
                    // open which one is clicked
                    parent.toggleClass("open");

                    // prevent
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        },
        menuOnClick: function () {
            var self = this;
            // Menu on click scroll animation for onepages
            $(".onepage-nav").find("a").on("click", function (e) {
                var target = $(this).attr("href");
                if (target.indexOf("#") === -1 || !$(target).length) {
                    return;
                }

                var elem = $(target),
                    targetPos = elem.offset().top;

                $("html, body").animate({
                    "scrollTop": targetPos
                }, 1200);
                e.preventDefault();
            });
        },
        owlCarousels: function () {
            var options = {
                loop: true,
                margin: 20,
                responsiveClass: true,
                nav: false,
                navText: ['<i class="fa fa-angle-left">", "<i class="fa fa-angle-right">'],
                dots: true,
                autoplay: true,
                autoplayTimeout: 10000,
                responsive: {
                    0: {
                        items: 2,
                        margin: 10
                    },
                    420: {
                        items: 3,
                        margin: 10
                    },
                    768: {
                        items: 4,
                        margin: 15
                    },
                    992: {
                        items: 5
                    }
                }
            };

            var clients = $(".clients-carousel .client");

            if (clients.length < 5) {
                options.loop = false;
                options.center = true;
            }

            $(".clients-carousel.owl-carousel").owlCarousel(options);
        },
        scrollBtnAppear: function () {
            if ($(window).scrollTop() >= 400) {
                $("#scroll-top").addClass("fixed");
            } else {
                $("#scroll-top").removeClass("fixed");
            }
        },
        scrollToTop: function () {
            $("#scroll-top").on("click", function (e) {
                $("html, body").animate({
                    "scrollTop": 0
                }, 1200);
                e.preventDefault();
            });
        },
        scrollToSchedule: function () {
            $("#scheduleButton").on("click", function (e) {
                $("html, body").animate({
                    "scrollTop": $("#schedule").offset().top
                }, 1200);
                e.preventDefault();
            });
        },
        scrollAnimations: function () {
            /* Wowy Plugin */
            if (typeof WOW === "function") {
                new WOW({
                    boxClass: "wow",      // default
                    animateClass: "animated", // default
                    offset: 0          // default
                }).init();
            }
        }
    };

    // Ready Event
    jQuery(document).ready(function () {
        // Init our app
        Simple.init();
    });

    // Load Event
    $(window).on("load", function () {
        Simple.scrollBtnAppear();
    });

    // Scroll Event
    $(window).on("scroll", function () {
        Simple.scrollBtnAppear();
    });
})(jQuery);