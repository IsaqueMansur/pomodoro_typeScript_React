import React, { useEffect, useState } from 'react';
import useInterval from '../hooks/use-interval';
import secondsToTime from '../utils/seconds-to-time';
import Button from './button';
import { Timer } from './timer';

const bellStart = require('../sounds/bell-start.mp3'); //eslint-disable-line
const bellStop = require('../sounds/bell-finish.mp3'); //eslint-disable-line

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellStop);

export interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const {
    pomodoroTime, shortRestTime, longRestTime, cycles,
  } = props;
  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCount, setTimeCount] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesInfo, setCyclesInfo] = useState(new Array(cycles - 1).fill(true));
  const [userAre, setUserAre] = React.useState('');

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  function configureWork() {
    setTimeCount(true);
    setResting(false);
    setWorking(true);
    setUserAre('Trabalhando');
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  }
  function configureRest(long: boolean) {
    setTimeCount(true);
    setWorking(false);
    setResting(true);
    setUserAre('Descansando');
    audioStopWorking.play();

    if (long) {
      setMainTime(longRestTime);
    } else {
      setMainTime(shortRestTime);
    }
  }

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesInfo.length > 0) {
      configureRest(false);
      cyclesInfo.pop();
    } else if (working && cyclesInfo.length <= 0) {
      configureRest(true);
      setCyclesInfo(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesInfo,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    configureWork,
  ]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCount ? 1000 : null,
  );

  return (
    <div className="pomodoro">
      {userAre
        ? (
          <h2>
            Você está:
            {' '}
            {userAre}
          </h2>
        ) : <h2>Inicie agora mesmo</h2>}
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Trabalhar" onClick={() => configureWork()} />
        <Button text="Descansar" onClick={() => configureRest(false)} />
        <Button className={!working && !resting ? 'hidden' : ''} text={timeCount ? 'Pausar' : 'Contar'} onClick={() => setTimeCount(!timeCount)} />
      </div>
      <div className="details">
        <p>
          Ciclos concluídos:
          {' '}
          {completedCycles}
        </p>
        <p>
          Tempo trabalhado:
          {' '}
          {secondsToTime(fullWorkingTime)}
        </p>
        <p>
          Pomodoros concluídos:
          {' '}
          {numberOfPomodoros}
        </p>
      </div>
    </div>
  );
}
