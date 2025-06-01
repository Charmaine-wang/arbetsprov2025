import { ReactNode } from "react";
import React from "react";

interface ChipProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, disabled, icon }) => {
  const isInteractive = !!onClick;

  return (
    <div
      role={onClick ? "button" : "status"}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <span>{label}</span>
      {onClick && !disabled && (
        <button
          onClick={(e) => {
            onClick();
          }}
          aria-label={`button ${label}`}
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default Chip;
