import React from 'react'; //eslint-disable-line
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer pomodoroTime={3600} shortRestTime={600} longRestTime={1200} cycles={3} />
    </div>
  );
}

export default App;
