import './vendor.js';

import './bootstrap-btn.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './fonts/DroidSerif/DroidSerif.css';
import './fonts/UbuntuMono/UbuntuMono.css';
import './fonts/YanoneKaffeesatz/YanoneKaffeesatz.css';

import './slides.css';

import heigLogo from './heig.png';

course.setLogo({
  linkUrl: 'https://heig-vd.ch',
  imageUrl: heigLogo,
  height: 60
});

course.start();
