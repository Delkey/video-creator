var video = (function() {
  var VIMEO = "vimeo";
  var YOUTUBE = "youtube";
  var ON = true;
  var OFF = false;
  var backDropStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.5
  };

  var boxStyles = {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  };

  var iframeStyles = {
    border: 0,
    margin: "auto",
    width: "90%",
    height: "90%"
  };

  var closeStyles = {
    position: "absolute",
    cursor: "pointer",
    top: "11px",
    left: "11px",
    color: "#fff",
    fontSize: "30px"
  };

  function createBackDrop() {
    var tag = '<div class="video-backdrop">';

    $("body").append(tag);
    var elm = $(".video-backdrop");

    $.each(backDropStyles, function(key, value) {
      elm.css(key, value);
    });
  }

  function playVideo(href) {
    scrollToggle(OFF);
    createIframe(href);
  }

  function createIframe(href) {
    var tag =
      '<div id="video-box">' +
      '<i class="xi-close-thin" onclick="video.close()"></i>' +
      '<iframe id="video-player" src="" allowfullscreen allowtransparency allow="autoplay"></iframe>' +
      "</div>";

    $("body").append(tag);

    var videoBox = $("#video-box");
    var videoPlayer = $("#video-player");
    var closeVideo = $(".xi-close-thin");

    $.each(boxStyles, function(key, value) {
      videoBox.css(key, value);
    });

    $.each(iframeStyles, function(key, value) {
      videoPlayer.css(key, value);
    });

    $.each(closeStyles, function(key, value) {
      closeVideo.css(key, value);
    });

    videoPlayer.attr(
      "src",
      href + "?autoplay=1&loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
    );
  }

  function scrollToggle(isOn) {
    $("html, body").css({ overflow: isOn ? "auto" : "hidden", display: isOn ? "block" : "fixed" });
  }

  function closeVideo() {
    scrollToggle(ON);
    $("#video-box").remove();
  }

  return {
    play: function(href) {
      playVideo(href);
    },

    close: function() {
      closeVideo();
    }
  };
})();

$(".video-player").click(function(e) {
  e.preventDefault();
  var href = e.target.href;
  video.play(href);
});
