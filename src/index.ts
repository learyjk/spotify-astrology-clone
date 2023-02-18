import { gsap } from 'gsap';
import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  // split the 'Astrology' heading into character spans
  const splitHeading = new SplitType('.h1');

  // define a master timeline
  const master = gsap.timeline();

  master.add(counter(loader().totalDuration())).add(header());

  function counter(duration: number) {
    //
    return gsap.to('#counter-num', {
      innerText: 100,
      snap: 'innerText', // snaps to nearest integer
      duration,
      ease: 'power4.out',
    });
  }

  function loader() {
    const tlLoader = gsap
      .timeline({
        onComplete: () => {
          gsap.set('.loader', { visibility: 'hidden' });
        },
      })
      // circle moon translate up/right with pause
      .to('.circle-moon-move', {
        xPercent: 20,
        yPercent: -20,
        duration: 1,
        ease: 'power4.out',
      })
      .to('.circle-moon-move', {
        xPercent: 100,
        yPercent: -100,
        duration: 1,
        ease: 'power4.out',
      })
      // animate orange panel from bottom
      .to(
        '.panel-orange',
        {
          height: '100%',
          duration: 1,
          ease: 'power4.out',
        },
        '<+0.1'
      )
      // fill circle with blue, with pause at 50%
      .to(
        '.circle-blue',
        {
          height: '50%',
          duration: 1,
          ease: 'power4.out',
        },
        '<'
      )
      .to('.circle-blue', {
        height: '100%',
        duration: 1,
        ease: 'power4.out',
      })
      // aniamte blue panel from bottom just as circle is filled with blue
      .to(
        '.panel-blue',
        {
          height: '100%',
          duration: 1,
          ease: 'power2.out',
        },
        '>-0.7'
      )
      // fill circle with yellow just as its blue fill finsihed and blue panel starts
      .to(
        '.circle-yellow',
        {
          height: '100%',
          duration: 1,
          ease: 'power4.out',
        },
        '<'
      )
      // expanding circles
      // "breathe in" with '.circle-wrap' which has the clip-path applied
      .to('.circle-wrap', {
        scale: 0.9,
      })
      // scale up '.circle-wrap' (clip path)
      .to('.circle-wrap', {
        scale: 3,
        duration: 1,
      })
      // scale up final orange circle, which also overlays our loading percent number
      .to(
        '.circle-orange-final',
        {
          scale: 2, // sacling to size of circle-wrap, which is also scaling.
          duration: 1.5,
        },
        '<'
      );

    return tlLoader;
  }

  function header() {
    const headerTimeline = gsap.timeline();

    headerTimeline
      .fromTo(
        splitHeading.chars,
        {
          opacity: 0,
          // starting value determined by index and multiplier value so that each character
          // is further down/right and rotated than the last.
          xPercent: (index) => {
            return (index + 1) * 20;
          },
          yPercent: (index) => {
            return (index + 1) * 30;
          },
          rotateZ: (index) => {
            return (index + 1) * 9;
          },
        },
        { opacity: 1, xPercent: 0, yPercent: 0, rotateZ: 0, duration: 0.5 }
      )
      .fromTo(
        '.is-a-lie',
        {
          opacity: 0,
        },
        { opacity: 1, duration: 1, delay: 1 }
      );

    return headerTimeline;
  }
});
