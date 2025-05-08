import "./StepsMenu.scss";
import { STEPS_SEQUENCE } from "./../../../steps";
import TickCircleSolid from "../../../../assets/icons/tick-circle-solid.svg";

const MenuBlock = ({ step, state }) => {
  const className = "menu-step " + state;
  return (
    <li className={className}>
      {step}
      {state === "completed" && (
        <img
          src={TickCircleSolid}
          alt="Green Tick Icon"
          className="green-tick"
        />
      )}
    </li>
  );
};

const StepsMenu = ({ currentStep }) => {
  let state = "completed";

  const menu = STEPS_SEQUENCE.map((step) => {
    const key = step.split(" ").join("_");
    if (step === currentStep) {
      state = "next";
      return <MenuBlock key={key} step={step} state="current" />;
    } else {
      return <MenuBlock key={key} step={step} state={state} />;
    }
  });

  return <ul className="isd-flow-steps-menu">{menu}</ul>;
};

export default StepsMenu;
