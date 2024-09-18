import "./Element.scss";
import ElementHeader from "../elementHeader/ElementHeader";
import { MyTextArea } from "../../../../utils";
import { generateRegisterName } from "../utils";

const getElementTypeName = (type) => {
  return type.split("_").join(" ");
};

const Element = ({ element, index, register, parent }) => {
  return (
    <section className="element-item">
      <div className="element-title">
        <ElementHeader type={element.type} />
      </div>
      <fieldset>
        <MyTextArea
          name="guidance"
          label="Guidance"
          rows="4"
          labelClass="grey-color"
          placeholder={`Enter the guidance for the ${getElementTypeName(
            element.type
          )}`}
          defaultValue={element.guidance}
          {...register(generateRegisterName(element, parent, index))}
        />
      </fieldset>
    </section>
  );
};

export default Element;
