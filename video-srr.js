$(function() {
    var $main = $("#video-list");
    var $items = $(".video-cell");
    var itemLength = $items.length;
    var startIdx = 0;
    var scrollIdx = 0;
    var delay = 300;
    var startTop = 10;
    var itemVerticalMagin = 15;

    function init() {
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
        var currentBottom = $(window).height() + $(window).scrollTop();

        $items.each(function(i) {
            var $self = $(this);
            setTimeout(function() {
                var itemTop = $self.offset().top;
                if (currentBottom > itemTop) {
                    $self.css("visibility", "visible");
                    $self.addClass("animated animatedFadeInUp fadeInUp");
                    startIdx = i;
                } else {
                    return false;
                }
            }, delay * i);
        });
    }

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

    $(window).resize(function(e) {
        init();
    });

    $items
        .mouseover(function(e) {
            $(this)
                .find(".video-thumb")
                .stop()
                .animate({ opacity: 0 }, 300);
            $(this)
                .find(".video-describe")
                .stop()
                .animate({ opacity: 1.0 }, 300);
        })
        .mouseleave(function(e) {
            $(this)
                .find(".video-thumb")
                .stop()
                .animate({ opacity: 1 }, 300);
            $(this)
                .find(".video-describe")
                .stop()
                .animate({ opacity: 0 }, 300);
        });

    init();
    start();
});
