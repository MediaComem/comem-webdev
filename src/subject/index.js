import tippy from 'tippy.js';
import subject from 'courses-md/dist/client';
window.gitMemoir = require('exports-loader?gitMemoir!git-memoir/dist/git-memoir');
window.subject = subject;

import 'font-awesome/css/font-awesome.css';

import './assets/bootstrap-btn.css';
import 'tippy.js/dist/tippy.css';
import './assets/fonts/DroidSerif/DroidSerif.css';
import './assets/fonts/UbuntuMono/UbuntuMono.css';
import './assets/fonts/YanoneKaffeesatz/YanoneKaffeesatz.css';
import './assets/slides.css';
import './assets/git-memoir.css';

import heigLogo from './assets/heig.png';

subject.events = subject.jQuery({});
subject.gitMemoirs = {};

subject.jQuery(function() {

  const $ = subject.jQuery;

  subject.setLogo({
    linkUrl: 'https://heig-vd.ch',
    imageUrl: heigLogo,
    height: 60
  });

  subject.start();

  updateGitMemoirs();
  subject.slideshow.on('afterShowSlide', updateGitMemoirs);
  subject.slideshow.on('beforeHideSlide', stopGitMemoir);

  function updateGitMemoirs() {
    $('.remark-visible .remark-slide-content git-memoir').each(function() {
      const $memoir = $(this);
      startGitMemoir($memoir);
    });
  }

  function startGitMemoir($memoir) {

    const name = $memoir.attr('name');
    if (!name) {
      throw new Error(`<git-memoir> tag has no name attribute`);
    }

    const svgHeight = $memoir.attr('svg-height');
    if (!svgHeight) {
      throw new Error(`<git-memoir> tag has no svg-height attribute`);
    }

    const chapter = $memoir.attr('chapter');

    let chapters = parseInt($memoir.attr('chapters'), 10);
    if (isNaN(chapters) || !chapters) {
      chapters = 1;
    }

    const memoirFunc = subject.gitMemoirs[name];
    if (!memoirFunc) {
      throw new Error(`No memoir found named "${name}"`);
    } else if (typeof(memoirFunc) != 'function') {
      throw new Error(`Memoir named "${name}" must be a function, got ${typeof(memoirFunc)}`);
    }

    const memoir = memoirFunc();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const $svg = $(svg)
      .attr('width', '100%')
      .attr('height', svgHeight)
      .appendTo($memoir);

    const modes = [ 'autoplay', 'manual', 'visualization' ];

    let played = false;
    let playing = false;

    const $controls = $('<div class="controls" />').appendTo($memoir);
    const $play = $('<button type="button" class="play tooltip" title="Play"><i class="fa fa-play" /></button>').appendTo($controls);

    const $mode = $('<button type="button" class="mode tooltip" data-dynamictitle="true"><i class="fa" /></button>');
    if (isLocalStorageAvailable()) {
      $mode.appendTo($controls);
    }

    const $back = $('<button type="button" class="back tooltip" title="Back"><i class="fa fa-backward" /></button>"').appendTo($controls);

    updateModeButton();
    const tooltips = tippy('git-memoir .tooltip[title]', {
      hideOnClick: false
    });

    $memoir.data('tooltips', tooltips);

    const drawer = new gitMemoir.Drawer(memoir, {
      svg: $svg[0]
    });

    $memoir.data('drawer', drawer);

    let drawing = initialDraw();

    if (isMode('autoplay')) {
      play();
    }

    updatePlayButtons();

    subject.events.trigger('memoir:start', [ drawer, $svg ]);

    $play.on('click', () => play());
    $mode.on('click', () => cycleMode());
    $back.on('click', () => back());

    function initialDraw() {

      const drawOptions = {
        immediate: true,
        initialDelay: 0,
        stepDuration: 0
      };

      if (!played && isMode('visualization')) {
        drawOptions.chapter = chapter;
        played = true;
      } else {
        drawOptions.until = chapter;
      }

      return drawer.draw(drawOptions);
    }

    function play(instant) {
      if ($play.is('.disabled') || playing) {
        return;
      }

      playing = true;
      updatePlayButtons();

      if (played) {
        drawer.clear();
        drawing = initialDraw();
      }

      const done = () => {
        playing = false;
        played = true;
        updatePlayButtons();
      };

      drawing = drawing.then(() => drawer.draw({
        immediate: !!instant,
        chapters: 1,
        initialDelay: instant ? 0 : 1000,
        stepDuration: instant ? 0 : 1000
      })).then(done, done);
    }

    function back() {
      if ($back.is('.disabled') || playing || !played) {
        return;
      }

      drawer.clear();
      drawing = initialDraw();
      played = false;

      updatePlayButtons();
    }

    function cycleMode() {

      const index = modes.indexOf(getMode());
      setMode(index < modes.length - 1 ? modes[index + 1] : modes[0]);

      if ((isMode('autoplay') || isMode('visualization')) && !playing && !played) {
        play(isMode('visualization'));
      }
    }

    function isMode(mode) {
      return getMode() == mode;
    }

    function setMode(mode) {
      localStorage.gitMemoirMode = mode;
      updateModeButton();
    }

    function getMode() {
      return isLocalStorageAvailable() ? localStorage.gitMemoirMode || 'autoplay' : 'visualization';
    }

    function updateModeButton() {

      let icon = 'play-circle-o';
      let title = 'Autoplay mode';

      if (isMode('manual')) {
        icon = 'pause-circle-o';
        title = 'Manual mode';
      } else if (isMode('visualization')) {
        icon = 'check-circle-o';
        title = 'Visualization mode';
      }

      $mode
        .attr('title', title)
        .find('i')
        .removeClass('fa-play-circle-o fa-pause-circle-o fa-check-circle-o')
        .addClass(`fa-${icon}`);
    }

    function updatePlayButtons() {
      $play[playing ? 'addClass' : 'removeClass']('disabled');
      $back[playing || !played ? 'addClass' : 'removeClass']('disabled');
    }
  }

  function stopGitMemoir() {
    $('.remark-visible .remark-slide-content git-memoir').each(function() {

      const $memoir = $(this);

      const drawer = $memoir.data('drawer');
      if (drawer) {
        drawer.stop();
      }

      const tooltips = $memoir.data('tooltips');
      if (tooltips) {
        tooltips.destroyAll();
      }

      $memoir.children().remove();

      subject.events.trigger('memoir:stop', $memoir);
    });
  }

  function isLocalStorageAvailable() {
    return typeof(Storage) != 'undefined';
  }
});
