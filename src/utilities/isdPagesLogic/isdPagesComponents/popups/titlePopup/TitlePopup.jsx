import "./TitlePopup.scss";
import { MyTextArea } from "../../../../utils";
import AddElementsMenu from "../addElementsMenu/AddElementsMenu";
import { useRef, useState } from "react";
import Element from "../element/Element";
import { generateRegisterName } from "../utils";

const TitlePopup = ({ item, onAdd, onDiscard, register, unregister }) => {
  const [elements, setElements] = useState(item.module.elements);
  const popupRef = useRef();
  const discardAllInputs = () => {
    unregister(`${item.moduleNumber}.description`);
    elements.map((element, index) => {
      unregister(generateRegisterName(element, item, index));
    });
    onDiscard();
  };

  const addElement = (element) => {
    setElements([...elements, element]);
  };

  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      discardAllInputs();
    }
  };
  return (
    <div ref={popupRef} onClick={closePopup} className="pop-up">
      <div className="pop-up-main">
        <h6 className="subheading">Module {item.moduleNumber + 1}</h6>
        <h3 className="title">{item.module.moduleTitle}</h3>
        <MyTextArea
          name="description"
          id="description"
          label="Description"
          rows="4"
          placeholder="Enter a description"
          defaultValue={item.module.description}
          {...register(`${item.moduleNumber}.description`)}
        />
        {elements.map((element, index) => (
          <Element
            key={index}
            element={element}
            index={index}
            register={register}
            parent={item}
          />
        ))}
        <div className="add-elements">
          <AddElementsMenu onAddElement={addElement} />
        </div>
        <div className="button-container">
          <button className="add button" onClick={onAdd} type="button">
            Add
          </button>
          <button
            className="discard button"
            onClick={discardAllInputs}
            type="button"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitlePopup;
