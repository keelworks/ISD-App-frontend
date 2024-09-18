import "./showMore.scss";
import { useState, Fragment } from "react";

const ShowMore = ({ text }) => {
  const [show, setShow] = useState(false);

  const textArray = Object.values(text);
  const textList = textArray.map((line, index) => {
    return (
      <Fragment key={index}>
        {line}
        {textArray.length - 1 !== index && <br />}
      </Fragment>
    );
  });

  let showMoreButtonClasses = "show-button show-more";
  let showMoreTextClasses = "";
  if (show) {
    showMoreButtonClasses += " hide";
  } else {
    showMoreTextClasses += "hide";
  }

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      {" "}
      <button
        type="button"
        className={showMoreButtonClasses}
        onClick={handleClick}
      >
        show more
      </button>
      {textArray.length > 1 && <br />}
      <span className={showMoreTextClasses}>
        <span>{textList}</span>{" "}
        <button
          type="button"
          className="show-button show-less"
          onClick={handleClick}
        >
          show less
        </button>
      </span>
    </>
  );
};

export default ShowMore;
