import { KeyboardArrowDown } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";

const SectionCollapse = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((pv) => !pv);

  return (
    <div>
      <div
        className={`flex h-[45px] min-h-[40px] cursor-pointer flex-row justify-start rounded-base bg-gray-100 px-2 text-secondary transition-all duration-300 ease-in-out`}
        onClick={toggle}
      >
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-4 text-left normal-case">
            {icon && icon}
            <span>{title}</span>
          </div>
          <KeyboardArrowDown
            className={`${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
          />
        </div>
      </div>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
};

export default SectionCollapse;
