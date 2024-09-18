import "./AddElementsMenu.scss";
import { useState } from "react";
import ElementHeader from "../elementHeader/ElementHeader";

const AddElementsMenu = ({ onAddElement }) => {
  const [showAddElementsMenu, setShowAddElementsMenu] = useState(false);

  const clickAddElements = () => {
    setShowAddElementsMenu(!showAddElementsMenu);
  };

  const addElement = (type) => {
    const newElement = {
      type: type,
      guidance: "",
    };
    onAddElement(newElement);
    setShowAddElementsMenu(false);
  };

  if (showAddElementsMenu === false) {
    return (
      <button type="button" className="add-button" onClick={clickAddElements}>
        + Add elements
      </button>
    );
  } else {
    return (
      <div className="menu-wrapper">
        <menu className="select-element-drop-down">
          <button
            type="button"
            className="add-button add-elements-button"
            onClick={clickAddElements}
          >
            + Add elements
          </button>
          <button
            type="button"
            className="teaching-text-button add-element-button"
            onClick={() => addElement("teaching_text")}
          >
            <ElementHeader type="teaching_text" />
          </button>
          <button
            type="button"
            className="image-button add-element-button"
            onClick={() => addElement("image")}
          >
            <ElementHeader type="image" />
          </button>
          <button
            type="button"
            className="multimedia-button add-element-button"
            onClick={() => addElement("multimedia")}
          >
            <ElementHeader type="multimedia" />
          </button>
          <button
            type="button"
            className="activity-button add-element-button"
            onClick={() => addElement("activity")}
          >
            <ElementHeader type="activity" />
          </button>
        </menu>
      </div>
    );
  }
};

export default AddElementsMenu;
