import React, { useState, useEffect } from "react";
import countdown from "countdown";
import axios from "axios";
import logo from "./logo.svg";
import styles from "./App.module.css";
import Clock from "./components/Clock/Clock";

countdown.DEFAULTS =
  countdown.YEARS |
  countdown.MONTHS |
  countdown.DAYS |
  countdown.HOURS |
  countdown.MINUTES |
  countdown.SECONDS;

const App = () => {
  const [from, setFrom] = useState(
    countdown(new Date("2020-01-25"), new Date())
  );
  console.log("App -> from", from);
  const [counterX, setCounterX] = useState({});
  const [counterY, setCounterY] = useState({});
  const [counterZ, setCounterZ] = useState({});

  const [milestoneX, setMilestoneX] = useState({});
  const [milestoneY, setMilestoneY] = useState({});
  const [milestoneZ, setMilestoneZ] = useState({});

  useEffect(() => {
    async function fetchBookList() {
      try {
        const responseX = await axios.get(
          `https://hcdn-9545b.firebaseio.com/X.json`
        );
        const responseY = await axios.get(
          `https://hcdn-9545b.firebaseio.com/Y.json`
        );
        const responseZ = await axios.get(
          `https://hcdn-9545b.firebaseio.com/Z.json`
        );

        setMilestoneX(responseX.data);
        setCounterX(responseX.data.value);
        setMilestoneY(responseY.data);
        setCounterY(responseY.data.value);
        setMilestoneZ(responseZ.data);
        setCounterZ(responseZ.data.value);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookList();
  }, []);

  // Third Attempts
  React.useEffect(() => {
    const timerX =
      milestoneX.value > 0 &&
      setInterval(() =>
        setCounterX(countdown(new Date(), new Date(milestoneX.value * 1000)))
      );
    const timerY =
      milestoneY.value > 0 &&
      setInterval(() =>
        setCounterY(countdown(new Date(), new Date(milestoneY.value * 1000)))
      );
    return () => {
      clearInterval(timerX);
      clearInterval(timerY);
    };
  }, [counterX, counterY, counterZ]);

  React.useEffect(() => {
    const timerZ =
      milestoneZ.value > 0 &&
      setInterval(() =>
        setCounterZ(countdown(new Date(), new Date(milestoneZ.value * 1000)))
      );
    return () => {
      clearInterval(timerZ);
    };
  }, [counterZ]);

  return (
    <div className={styles.App}>
      <div className={`${styles.BackgroundPreview} ${styles.Background}`} />
      <div className={styles.BackgroundPreview} />

      <div class={styles.Container}>
        <h1 class={styles.Title}>
          Đại Việt năm Cô vy thứ nhất<br/>mùng {from.months * 30 + from.days} tết
        </h1>
        <div className={styles.SearchBox}>
          <div className={styles.SearchIcon}></div>
          <form
            className={styles.SearchContainer}
            action="https://www.google.com/search"
            method="get"
          >
            <input
              className={styles.SearchInput}
              type="search"
              name="q"
              tabindex="-1"
              autocomplete="off"
              placeholder="Search Google"
            />
            <input className={styles.SearchSubmit} type="submit" />
          </form>
        </div>

        <div className={styles.RowsContainer}>
          <div className={styles.MainRow}>
            <h2>Ngày nộp Báo cáo</h2>
            <ul>
              <li>
                <span id="days">{counterX.months * 30 + counterX.days}</span>
                ngày
              </li>
              <li>
                <span id="hours">{counterX.hours}</span>giờ
              </li>
              <li>
                <span id="minutes">{counterX.minutes}</span>phút
              </li>
              <li>
                <span id="seconds">{counterX.seconds}</span>giây
              </li>
            </ul>
          </div>

          <div className={styles.Row}>
            <div className={styles.OtherContainer}>
              <h2>Phản biện</h2>
              <ul className={styles.Other}>
                <li>
                  <span className={styles.Days2}>
                    {counterY.months * 30 + counterY.days}
                  </span>
                  <p>ngày</p>
                </li>
                {/* <li>
            <span id="hours">{counterY.hours}</span>giờ
          </li>
          <li>
            <span id="minutes">{counterY.minutes}</span>phút
          </li>
          <li>
            <span id="seconds">{counterY.seconds}</span>giây
          </li> */}
              </ul>
            </div>
            <div className={styles.OtherContainer}>
              <h2>Bảo vệ</h2>
              <ul className={styles.Other}>
                <li>
                  <span className={styles.Days2}>
                    {counterZ.months * 30 + counterZ.days}
                  </span>
                  <p>ngày</p>
                </li>
                {/* <li>
            <span id="hours">{counterZ.hours}</span>giờ
          </li>
          <li>
            <span id="minutes">{counterZ.minutes}</span>phút
          </li>
          <li>
            <span id="seconds">{counterZ.seconds}</span>giây
          </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <Clock
        description={milestoneX.description}
        month={counterX.months}
        day={counterX.days}
        hour={counterX.hours}
        minute={counterX.minutes}
        second={counterX.seconds}
      /> */}
      {/* <div className="Counter1">
        {milestoneX.description}: {counterX.toString()}
      </div>
      <div className="Counter1">
        {milestoneY.description}: {counterY.toString()}
      </div>
      <div className="Counter1">
        {milestoneZ.description}: {counterZ.toString()}
      </div> */}
    </div>
  );
};

export default App;
