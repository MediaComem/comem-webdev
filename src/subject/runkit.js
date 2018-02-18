import subject from 'courses-md/dist/client';
import $ from 'jquery';
import MicroModal from 'micromodal';

import { sha1 } from './utils';

export class RunkitController {
  static start() {
    this.startRunkit();
    subject.slideshow.on('afterShowSlide', this.startRunkit);
    subject.slideshow.on('beforeHideSlide', this.destroyRunkit);
  }

  static startRunkit() {
    $('.remark-visible .remark-slide-content code.javascript:not(.runkit)').each(function() {
      const $code = $(this);
      new RunkitController($code).start();
    });
  }

  static destroyRunkit() {
    $('.runkit').each(function() {
      const controller = $(this).data('runkit-controller');
      if (controller) {
        controller.destroy();
      } else {
        console.warn('Runkit controller not found for', this);
      }
    });
  }

  constructor($code) {
    this.$element = $code;
    this.$element.addClass('runkit').data('runkit-controller', this);
  }

  start() {
    if (this.source) {
      throw new Error('Runkit controller has already started');
    }

    this.source = this.parseCode(this.$element);
    this.sourceId = `runkit-comem-webdev-${sha1(this.source)}`;

    this.modal = this.getModal();
    this.$element.on('click', () => {
      MicroModal.show(`${this.sourceId}-modal`, {
        onShow: modal => {
          const $source = $(modal).find('.source');
          RunKit.createNotebook({
            element: $source[0],
            source: $source.text(),
            onLoad: notebook => notebook.evaluate()
          });
        },
        onClose: modal => {
          $(modal).find('.source iframe').remove();
        }
      });
    });
  }

  destroy() {

    const modalId = `${this.sourceId}-modal`;
    const $modal = $(`#${modalId}`);
    $modal.remove();

    this.$element.removeClass('runkit').data('runkit-controller', null);
    this.$element.off('click');
  }

  parseCode($code) {
    const $lines = $code.find('.remark-code-line');
    return $.map($lines, line => $(line).contents().text()).join('\n');
  }

  getModal() {
    const $modal = $(`#${this.sourceId}-modal`);
    return $modal.length ? $modal : createModal(this.sourceId, this.source);
  }
}


function createModal(id, source) {

  const titleText = $('.remark-visible .remark-slide-content').find('h1, h2, h3, h4, h5, h6').first().text() || 'Source';

  const $modal = $('<div />').attr('id', `${id}-modal`).attr('aria-hidden', 'true').addClass('micromodal').appendTo($('body'));
  const $overlay = $('<div />').addClass('overlay').attr('tabindex', '-1').attr('data-micromodal-close', '').appendTo($modal);
  const $dialog = $('<div />').addClass('container').attr('role', 'dialog').attr('aria-modal', 'true').attr('aria-labelledby', `${id}-title`).appendTo($overlay);

  const $header = $('<header />').addClass('header').appendTo($dialog);
  const $title = $('<h2 />').addClass('title').attr('id', `${id}-title`).text(titleText).appendTo($header);
  const $closeButton = $('<button />').attr('aria-label', 'Close').attr('data-micromodal-close', '').text('Close').appendTo($header);

  const $content = $('<div />').attr('id', `${id}-content`).appendTo($dialog);
  const $source = $('<div />').addClass('source').appendTo($content);
  const $sourceCode = $('<div />').css('display', 'none').text(source).appendTo($source);

  return $modal;
}
