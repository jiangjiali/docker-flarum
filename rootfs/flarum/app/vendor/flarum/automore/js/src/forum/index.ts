import app from 'flarum/forum/app';
import $ from 'jquery';

app.initializers.add('flarum/automore', () => {
  // @ts-ignore
  $.fn.isInViewport = function () {
    // @ts-ignore
    const elementTop = $(this).offset().top;
    // @ts-ignore
    const elementBottom = elementTop + $(this).outerHeight();
    // @ts-ignore
    const viewportTop = $(window).scrollTop()*1;
    // @ts-ignore
    const viewportBottom = viewportTop + $(window).height();
    // @ts-ignore
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(window).on('resize scroll', function () {
    $('[class$="loadMore"] button').each(function () {
      // @ts-ignore
      if ($(this).isInViewport()) {
        $(this).click();
      }
    });
  });
});
