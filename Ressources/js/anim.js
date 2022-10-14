document.addEventListener("DOMContentLoaded", function () {
  /* ---------- FIXED HEADER ANIM ---------- */
  const showAnim = gsap
    .from("header", {
      yPercent: -100,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });

  $(".btn_popup").click(function () {
    $(".popup_page2").show();
    $(".popup_page1").hide();
  });

  $(".btn_popup_fermer").click(function () {
    $(".popup_page2").hide();
    $("#open-modal").hide();
  });

  $(".modal-close").click(function () {
    $("#open-modal").hide();
  });

  $(".commande_popup").click(function () {
    $(".popup_page1").show();
    $("#open-modal").show();
  });

  /* ---------- SLIDER JS ---------- */
  var splide = new Splide(".splide", {
    type: "loop",
    perPage: 1,
    drag: true,
    autoplay: true,
  });

  splide.mount();

  function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
      y = direction * 50;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
      gsap.from(elem, {
        x: 0,
        y: 0,
        textContent: 0,
        duration: 2,
        ease: "power3",
        snap: { textContent: 1 },
        stagger: {
          each: 1.0,
          onUpdate: function () {
            this.targets()[0].innerHTML = this.targets()[0].textContent + "+";
          },
        },
      });
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(
      elem,
      { x: x, y: y, autoAlpha: 0 },
      {
        duration: 1,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "power3",
        overwrite: "auto",
      }
    );
  }

  function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
  }
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      start: "top 75%",
      onEnter: function () {
        animateFrom(elem);
      },
      onLeaveBack: (self) => self.disable(),
    });
  });
});
