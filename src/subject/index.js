import subject from 'courses-md/dist/client';

window.gitMemoir = require('exports-loader?gitMemoir!git-memoir/dist/git-memoir');
window.subject = subject;

import { GitMemoirController } from './git-memoir';

import 'font-awesome/css/font-awesome.css';

import './assets/bootstrap-btn.css';
import 'tippy.js/dist/tippy.css';
import './assets/fonts/DroidSerif/DroidSerif.css';
import './assets/fonts/UbuntuMono/UbuntuMono.css';
import './assets/fonts/YanoneKaffeesatz/YanoneKaffeesatz.css';
import './assets/slides.css';
import './assets/git-memoir.css';

import heigLogo from './assets/heig.png';

const $ = subject.jQuery;

$(function() {

  subject.setLogo({
    linkUrl: 'https://heig-vd.ch',
    imageUrl: heigLogo,
    height: 60
  });

  subject.start();

  GitMemoirController.start();
});
