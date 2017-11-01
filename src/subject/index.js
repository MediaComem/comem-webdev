import course from 'courses-md/dist/client';

import 'font-awesome/css/font-awesome.css';

import './assets/bootstrap-btn.css';
import './assets/fonts/DroidSerif/DroidSerif.css';
import './assets/fonts/UbuntuMono/UbuntuMono.css';
import './assets/fonts/YanoneKaffeesatz/YanoneKaffeesatz.css';
import './assets/slides.css';

import heigLogo from './assets/heig.png';

course.setLogo({
  linkUrl: 'https://heig-vd.ch',
  imageUrl: heigLogo,
  height: 60
});

course.start();
