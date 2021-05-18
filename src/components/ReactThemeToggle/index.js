// https://github.com/gomorizsolt/react-theme-toggle-button
// with inverted logic
import React from "react";
import * as styles from "./styles.module.css";

const defaultOptions = {
  inverted: true
};
const ReactThemeToggleButton = ({
  isDark,
  onChange,
  options = defaultOptions
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    className={styles.container}
    title={isDark ? "Activate light mode" : "Activate dark mode"}
    aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
  >
    <input
      type="checkbox"
      checked={defaultOptions.inverted ? !isDark : isDark}
      onChange={onChange}
    />
    <div />
  </label>
);

export default ReactThemeToggleButton;
