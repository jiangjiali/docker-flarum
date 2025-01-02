import app from 'flarum/common/app';
import { extend } from 'flarum/common/extend';
import Application from 'flarum/common/Application';

const SPEECH_BALLOON = String.fromCodePoint(0x1f4ac);

const text = (title: any) => {
  return `%c${title} ${SPEECH_BALLOON}`;
};

export default function () {
  // @ts-ignore
  extend(Application.prototype, 'mount', () => {
    if (!app.forum) {
      return;
    }

    const title = app.forum.attribute('title');

    const params = [
      'padding-top: 1em; font-size: 2em;',
    ];

    console.log(text(title), ...params);
  });
}
