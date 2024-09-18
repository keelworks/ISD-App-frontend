import "./ElementHeader.scss";
import UserIcon from "../../../../../assets/icons/user.svg";
import SettingsIcon from "../../../../../assets/icons/settings.svg";
import LightningIcon from "../../../../../assets/icons/lightning.svg";

const getIcon = (type) => {
  switch (type) {
    case "teaching_text":
      return UserIcon;
    case "image":
    case "activity":
      return SettingsIcon;
    case "multimedia":
      return LightningIcon;
    default:
      console.log("Wrong element type!");
  }
};

const getIconName = (type) => {
  switch (type) {
    case "teaching_text":
      return "user";
    case "image":
    case "activity":
      return "settings";
    case "multimedia":
      return "lightning";
    default:
      console.log("Wrong element type!");
  }
};

const getElementName = (type) => {
  switch (type) {
    case "teaching_text":
      return "Teaching text";
    case "image":
      return "Image";
    case "activity":
      return "Activity";
    case "multimedia":
      return "Multimedia";
    default:
      console.log("Wrong element type!");
  }
};

const ElementHeader = ({ type }) => {
  return (
    <>
      <img
        src={getIcon(type)}
        alt={`${getIconName(type)} icon for ${getElementName(type)} element`}
        className={`${getIconName(type)}-icon`}
      />
      <span className="element-name">{getElementName(type)}</span>
    </>
  );
};

export default ElementHeader;
