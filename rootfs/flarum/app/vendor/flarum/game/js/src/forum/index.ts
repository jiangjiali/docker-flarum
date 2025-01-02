import app from 'flarum/forum/app';
import ConsoleWelcome from "./components/ConsoleWelcome";

app.initializers.add('flarum/game', () => {
  ConsoleWelcome();
});
