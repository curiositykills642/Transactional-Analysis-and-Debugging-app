import React from 'react';
import './Box.css'; // Import the CSS file for styling

const Box = ({ titles, contents }) => {
  const renderArrayItems = (titles, contents) => {
    return titles.map((title, index) => (
      <div key={index} className="item  ms-4 mb-3">
        <span className="title">{title} : </span> <span className="content">{contents[index]}</span>
      </div>
    ));
  };

  if (Array.isArray(titles) && Array.isArray(contents) && titles.length === contents.length) {
    return (
      <div className="boxNotes">
        <div className="content-wrapper">{renderArrayItems(titles, contents)}</div>
      </div>
    );
  }

  return null; // Return null or an appropriate fallback if the input is not valid
};

export default Box;
