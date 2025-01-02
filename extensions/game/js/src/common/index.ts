import app from 'flarum/common/app';

app.initializers.add('flarum/game', () => {
  console.log('[flarum/game] Hello, forum and admin!');
});
