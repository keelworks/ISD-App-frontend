import { useRef, useState } from "react";
import { MyInput } from "../../../../utils";
import AddElementsMenu from "../addElementsMenu/AddElementsMenu";
import Element from "../element/Element";
import { generateRegisterName } from "../utils";

const LessonPopup = ({ item, onAdd, onDiscard, register, unregister }) => {
  const currLesson = item.lessonNumber;
  const [elements, setElements] = useState(
    item.module.lessons[currLesson].elements
  );
  const popupRef = useRef();

  const headerRegisterName = `${item.moduleNumber}.lessons.${currLesson}.header`;
  const desiredOutcomeRegisterName = `${item.moduleNumber}.lessons.${currLesson}.desiredOutcome`;

  const discardAllInputs = () => {
    unregister(headerRegisterName);
    unregister(desiredOutcomeRegisterName);
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
        <h6 className="subheading">
          Module {item.moduleNumber + 1} : {item.module.moduleTitle}
        </h6>
        <h3 className="title">
          Lesson {currLesson + 1} : {item.module.lessons[currLesson].lessonName}
        </h3>
        <fieldset>
          <MyInput
            name="header"
            id="header"
            label="Header"
            type="input"
            defaultValue={item.module.lessons[currLesson].header}
            {...register(headerRegisterName)}
          />
        </fieldset>
        <fieldset>
          <MyInput
            name="desired_outcome"
            id="desired_outcome"
            label="Desired Outcome"
            type="input"
            defaultValue={item.module.lessons[currLesson].desiredOutcome}
            {...register(desiredOutcomeRegisterName)}
          />
        </fieldset>
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

export default LessonPopup;
