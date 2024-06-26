import "./StepsMenu.scss";
import TickCircleSolid from "../../../assets/icons/tick-circle-solid.svg";

const MENU_STEPS = [
  "Needs Analysis",
  "Objective",
  "Final Assessment Strategy",
  "Course Structure",
  "Course Strategy Document",
  "Storyboard",
];

const MenuBlock = ({ step, state }) => {
  const className = "menu-step " + state;
  const key = step.split(" ").join("_");
  return (
    <li key={key} className={className}>
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

  const menu = MENU_STEPS.map((step) => {
    if (step === currentStep) {
      state = "next";
      return <MenuBlock step={step} state="current" />;
    } else {
      return <MenuBlock step={step} state={state} />;
    }
  });

  return <ul className="isd-flow-steps-menu">{menu}</ul>;
};

export default StepsMenu;
