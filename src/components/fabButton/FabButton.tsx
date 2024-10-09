import { IFabButton } from "../../models/FabButton";
import fab from "../../assets/images/add_circle/add_circle.svg";
import "./FabButton.css";

import { useNavigate } from "react-router-dom";

export function FabButton({ path }: IFabButton): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="fab" onClick={handleClick}>
        <img src={fab} alt="add Button" />
      </div>
    </>
  );
}
