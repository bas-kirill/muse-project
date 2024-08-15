import React from "react";

interface Props {
  pageNumber: number;
  totalPages: number;
  setPageNumber: (pageNumber: number) => void;
}

export const NavigationBar = (props: Props) => {
  return (
    <div id="pages-navigation-bar">
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
