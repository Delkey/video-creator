$(function() {
    var $main = $("#video-list");
    var $items = $(".video-cell");
    var itemLength = $items.length;
    var startIdx = 0;
    var scrollIdx = 0;
    var delay = 100;
    var startTop = 15;
    var itemVerticalMagin = 10;
    var isMobile = navigator.userAgent.match("iPhone") || navigator.userAgent.match("Android") ? true : false;

    function init() {
        $("#footer").css("height", "220px");
        var mainHeight = 0;

        $items.each(function(i) {
            var imgHeight = $(this)
                .find("img")
                .height();
            $(this).css({ top: i * (imgHeight + itemVerticalMagin * 2) + startTop, height: imgHeight });
            mainHeight += imgHeight + itemVerticalMagin * 2;
        });

        $main.css("height", mainHeight + startTop);
    }

    function start() {
        $items.each(function(i) {
            var $self = $(this);
            setTimeout(function() {
                var itemTop = $self.offset().top;
                var currentBottom = $(window).height() + $(window).scrollTop();
                if (currentBottom > itemTop) {
                    $self.css("visibility", "visible");
                    $self.addClass("animated animatedFadeInUp fadeInUp");
                    startIdx = i;
                } else {
                    return false;
                }
            }, delay * i);
        });

        $(window).scroll(function(e) {
            setTimeout(function() {
                if (itemLength > startIdx) {
                    var currentBottom = $(window).height() + $(window).scrollTop();
                    var $startItem = $items.eq(startIdx);
                    var itemTop = $startItem.offset().top;
                    if (currentBottom > itemTop) {
                        $startItem.css("visibility", "visible");
                        $startItem.addClass("animated animatedFadeInUp fadeInUp");
                        startIdx++;
                    }
                }
            }, delay * scrollIdx++);
        });
    }

    $(window).resize(function(e) {
        init();
    });

    if (isMobile) {
        $(".video-thumb").click(function(e) {
            $(".video-thumb")
                .stop()
                .animate({ opacity: 1 }, 500)
                .css("z-index", 1);
            $(".video-describe")
                .stop()
                .animate({ opacity: 0 }, 500)
                .css("z-index", 0);
            $(this)
                .stop()
                .animate({ opacity: 0 }, 500)
                .css("z-index", 0);
            $(this)
                .siblings()
                .stop()
                .animate({ opacity: 1 }, 500)
                .css("z-index", 1);
        });

        $('.video-describe').click(function(e) {
            if(!$(e.target).hasClass("video-player") && !$(e.target).hasClass("xi-vimeo")) {
                $(this)
                    .stop()
                    .animate({ opacity: 0 }, 500)
                    .css("z-index", 0);
                $(this)
                    .siblings()
                    .stop()
                    .animate({ opacity: 1 }, 500)
                    .css("z-index", 1);
            }
        });
    } else {
        $items
            .mouseover(function(e) {
                $(this)
                    .find(".video-thumb")
                    .stop()
                    .animate({ opacity: 0 }, 500)
                    .css("z-index", 0);
                $(this)
                    .find(".video-describe")
                    .stop()
                    .animate({ opacity: 1 }, 500)
                    .css("z-index", 1);
            })
            .mouseleave(function(e) {
                $(this)
                    .find(".video-describe")
                    .stop()
                    .animate({ opacity: 0 }, 500)
                    .css("z-index", 0);
                $(this)
                    .find(".video-thumb")
                    .stop()
                    .animate({ opacity: 1 }, 500)
                    .css("z-index", 1);
            });
    }

    init();
    start();
});
