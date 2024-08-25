import React from "react";
import styles from "./styles/NavigationBar.widget.module.css";

interface Props {
  totalPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

export const NavigationBarWidget = (props: Props) => {
  return (
    <div className={styles.navbar}>
      <button
        className={`
          ${styles.navbar__button} 
          ${props.pageNumber === 1 && styles.navbar__non_clickable}
        `}
        onClick={() => props.setPageNumber(Math.max(1, props.pageNumber - 1))}
      >
        Previous
      </button>

      <button
        className={`
          ${styles.navbar__button} 
          ${props.pageNumber === props.totalPages && styles.navbar__non_clickable}
        `}
        onClick={() => props.setPageNumber(Math.min(props.pageNumber + 1, props.totalPages))}
      >
        Next
      </button>
    </div>
  );
};
