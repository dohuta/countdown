import React from "react";
import styles from "./Clock.module.css";

const Part = ({ title, value, ...props }) => {
  return (
    <div className={styles.PartContainer}>
      <p className={styles.Title}>{title}</p>
      <p>&nbsp;:&nbsp;</p>
      <p className={styles.Value}>{value}</p>
    </div>
  );
};

const Divider = (props) => {
  return <div className={styles.Divider}>:</div>;
};

const FullPart = ({ month, day, hour, minute, second, ...props }) => {
  return (
    <div className={styles.FullpartContainer}>
      <Part title="Month" value={month} />
      <Part title="Day" value={day} />
      <Part title="Hour" value={hour} />
      <Part title="Minute" value={minute} />
      <Part title="Second" value={second} />
    </div>
  );
};

const Clock = ({ description, month, day, hour, minute, second, ...props }) => {
  return (
    <div className={styles.ClockContainer}>
      <p className={styles.Description}>{description}</p>
      <FullPart
        month={month}
        day={day}
        hour={hour}
        minute={minute}
        second={second}
      />
    </div>
  );
};

export default Clock;
