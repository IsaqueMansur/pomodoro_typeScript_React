import React from 'react';
import useInterval from '../hooks/use-interval';
import Button from './button';
import { Timer } from './timer';

export interface Props {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const { defaultPomodoroTime } = props;
  const [mainTime, setMainTime] = React.useState(defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <Button text="text" />
    </div>
  );
}
