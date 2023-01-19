import React from 'react'; //eslint-disable-line
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return <div className="app"><PomodoroTimer defaultPomodoroTime={1500} /></div>;
}

export default App;
