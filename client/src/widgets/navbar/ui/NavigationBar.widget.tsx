import React from "react";
import styles from "./styles/NavigationBarWidget.module.css";

interface Props {
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const NavigationBarWidget = (props: Props) => {
  return (
    <div className={styles.navbar} id="pages-navigation-bar">
      {props.pageNumber > 1 && (
        <button onClick={() => props.setPageNumber(props.pageNumber - 1)}>
          Previous
        </button>
      )}
      {props.pageNumber < props.totalPages && (
        <button onClick={() => props.setPageNumber(props.pageNumber + 1)}>
          Next
        </button>
      )}
    </div>
  );
};
