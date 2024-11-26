import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

const Theme = ({ toggleTheme }) => {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    toggleTheme(newTheme);
  };

  return (
    <div className="theme">
      <div className="theme-icon">
        <MdOutlineWbSunny
          className={`light-icon ${!isDark ? "active" : "inactive"}`}
          onClick={handleToggle}
        />
        <IoMoonOutline
          className={`dark-icon ${isDark ? "active" : "inactive"}`}
          onClick={handleToggle}
        />
      </div>
    </div>
  );
};

export default Theme;
