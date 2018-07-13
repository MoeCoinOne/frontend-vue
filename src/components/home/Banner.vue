<template>
  <div class="logo-animation">
    <div class="letters">
      <div class="letter letter-a">
        <svg viewBox="0 0 162 162">
          <g fill="none" fill-rule="evenodd" stroke="#5E89FB">
            <path class="fill in" stroke-width="40" d="M101 141H81a60 60 0 1 1 0-120c33.14 0 59 26.86 60 60v80"/>
          </g>
        </svg>
      </div>
      <div class="letter letter-n">
        <svg viewBox="0 0 162 162">
          <g fill="none" fill-rule="evenodd" stroke="#FB155A">
            <path class="fill in" stroke-width="40" d="M21 161V1"/>
            <path class="fill in" stroke-width="40" d="M21 161V81c1-33.14 26.86-60 60-60a60 60 0 0 1 60 60v80"/>
          </g>
        </svg>
      </div>
      <div class="letter letter-k">
        <svg viewBox="0 0 162 162">
          <path class="fill in" d="m 27 57 m 0 -20 a 20 20 0 1 1 0 40 a 20 20 0 1 1 0 -40" stroke-width="10" stroke-linecap="butt" stroke="#E65454" fill="none" style="stroke-dashoffset: 251.363; stroke-dasharray: 125.681, 31.4204, 94.2611, 31.4204, 125.681;"></path>
          <path class="fill in" d="m 7 0 l 0 114" stroke-width="10" stroke-linecap="butt" stroke="#E65454" fill="none" style="stroke-dashoffset: 228; stroke-dasharray: 114, 134, 62;"></path>
        </svg>
      </div>

      <div class="letter letter-e">
        <svg viewBox="0 0 162 162">
          <g fill="none" fill-rule="evenodd" stroke="#18FF92">
            <path class="fill in" stroke-width="40" d="M81 101h60V81c-1-33.14-26.86-60-60-60a60 60 0 1 0 0 120"/>
          </g>
        </svg>
      </div>
      <div class="dot dot-i">
        <svg viewBox="0 0 42 42">
          <g fill="none" fill-rule="evenodd">
            <rect width="40" height="40" x="1" y="1" fill="#17F28C" rx="20"/>
          </g>
        </svg>
      </div>
      <div class="dot dot-e">
        <svg viewBox="0 0 42 42">
          <g fill="none" fill-rule="evenodd">
            <rect width="40" height="40" x="1" y="1" fill="#FFFFFF" rx="20"/>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import anime from 'animejs'
export default {
  mounted () {
    var logoEl = document.querySelector('.logo-animation')
    var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)')
    var innerWidth = window.innerWidth
    var maxWidth = 740;
    var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1
    var logoTimeline = anime.timeline()

    logoEl.style.transform = 'translateY(50px) scale('+logoScale+')'

    for (var i = 0; i < pathEls.length; i++) {
      var el = pathEls[i];
      el.setAttribute('stroke-dashoffset', anime.setDashoffset(el))
    }

    logoTimeline
    .add({
      targets: '.dot-e',
      translateX: [
        { value: -600, duration: 520, delay: 200, easing: 'easeInQuart' },
        { value: [-100, 0], duration: 500, delay: 1000, easing: 'easeOutQuart' }
      ],
      scale: [
        { value: [0, 1], duration: 200, easing: 'easeOutBack' },
        { value: 0, duration: 20, delay: 500, easing: 'easeInQuart' },
        { value: 1, duration: 200, delay: 1000, easing: 'easeOutQuart' }
      ],
      offset: 0
    })
    .add({
      targets: '.dot-i',
      translateY: { value: [-200, 0], duration: 500, elasticity: 400 },
      scale: [
        { value: [0, 1], duration: 100, easing: 'easeOutQuart' }
      ],
      delay: 1200,
      offset: 0
    })
    .add({
      targets: '.fill.in',
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 600,
        delay: function(el, i, t) { return 700 + ( i * 100 ); },
        easing: 'easeOutQuart'
      },
      stroke: {
        value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
        duration: 500,
        delay: 500,
        easing: 'easeInQuad'
      },
      offset: 0
    })
  }
}
</script>

<style lang="less" scoped>
body {
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000;
}
body.ready {
  opacity: 1;
}
.logo-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -40px;
}
.letters {
  position: relative;
  display: flex;
  width: 682px;
  height: 162px;
}
.letter {
  position: relative;
  width: 162px;
  height: 162px;
}
.letter:not(:first-child) {
  margin-left: -42px;
}
.letter-i {
  z-index: 1;
  width: 82px;
  transform-origin: 100% 50%;
}
.dot {
  position: absolute;
  width: 42px;
  height: 42px;
  transform: scale(0);
}
.dot-i {
  top: 0;
  left: 240px;
}
.dot-e {
  bottom: 0;
  right: 0;
}
.logo-icon {
  display: flex;
  position: absolute;
  left: 230px;
  top: -10px;
  width: 222px;
  height: 62px;
}
.icon {
  width: 62px;
  height: 62px;
  opacity: 0;
}
.icon-text {
  position: absolute;
  top: 60px;
  left: 60px;
  width: 160px;
  height: 62px;
}
.icon-text path,
.icon-text polygon {
  opacity: 0;
}
</style>
