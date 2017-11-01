import course from 'courses-md/dist/client';
window.gitMemoir = require('exports-loader?gitMemoir!git-memoir/dist/git-memoir');
window.course = course;

import 'font-awesome/css/font-awesome.css';

import './assets/bootstrap-btn.css';
import './assets/fonts/DroidSerif/DroidSerif.css';
import './assets/fonts/UbuntuMono/UbuntuMono.css';
import './assets/fonts/YanoneKaffeesatz/YanoneKaffeesatz.css';
import './assets/slides.css';

import heigLogo from './assets/heig.png';

course.gitMemoirs = {};

course.jQuery(function() {

  const $ = course.jQuery;

  course.setLogo({
    linkUrl: 'https://heig-vd.ch',
    imageUrl: heigLogo,
    height: 60
  });

  course.start();

  updateGitMemoirs();
  course.slideshow.on('afterShowSlide', updateGitMemoirs);
  course.slideshow.on('beforeHideSlide', stopGitMemoir);

  function updateGitMemoirs() {
    $('.remark-visible .remark-slide-content svg[git-memoir]').each(function() {
      const $svg = $(this);
      startGitMemoir(this, {
        memoir: $svg.attr('git-memoir'),
        start: $svg.attr('git-memoir-start'),
        end: $svg.attr('git-memoir-end')
      });
    });
  }

  function startGitMemoir(svg, options) {

    const memoirFunc = course.gitMemoirs[options.memoir];
    if (!memoirFunc) {
      throw new Error(`No memoir found named "${options.memoir}"`);
    } else if (typeof(memoirFunc) != 'function') {
      throw new Error(`Memoir named "${options.memoir}" must be a function, got ${typeof(memoirFunc)}`);
    }

    const drawer = new gitMemoir.Drawer(memoirFunc(), {
      svg: svg
    });

    $(svg).data('git-memoir-drawer', drawer);

    let drawing = drawer.draw({
      immediate: true,
      initialDelay: 0,
      stepDuration: 0,
      until: options.start
    });

    if (options.end || options.start) {

      const drawOptions = {
        initialDelay: 1000,
        stepDuration: 1000
      };

      if (options.end) {
        drawOptions.until = options.end;
      } else {
        drawOptions.chapters = 1;
      }

      drawing = drawing.then(() => drawer.draw(drawOptions));
    }
  }

  function stopGitMemoir() {
    $('.remark-visible .remark-slide-content svg[git-memoir]').each(function() {

      const $svg = $(this);

      const drawer = $svg.data('git-memoir-drawer');
      if (drawer) {
        drawer.stop();
      }

      $svg.children().remove();
    });
  }
});
