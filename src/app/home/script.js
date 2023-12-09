$(".ripple").ready(function () {
    for (let i = 0; i <= 40; i++) {
      $createWave = $("<div class='wave'></div>");
      $(".ripple").append($createWave);
      $(".wave:nth-child(" + i + ")").css("height", i * 8 + "px");
      $(".wave:nth-child(" + i + ")").css("width", i * 8 + "px");
      $(".wave:nth-child(" + i + ")").css("z-index", 40 - i);
      $(".wave:nth-child(" + i + ")").css(
        "animation-delay",
        0.1 * (40 - i) + "s"
      );
      $(".wave:nth-child(" + i + ")").css(
        "backgroundColor",
        "hsl(100,0%," + i + "%)"
      );
    }
  });
  