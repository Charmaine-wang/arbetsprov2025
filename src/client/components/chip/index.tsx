import { ReactNode } from "react";
import React from "react";
import { styled } from "styled-components";

const StyledChip = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px solid #cecece;
  border-radius: 24px;
  padding: 8px 16px;
  font-size: 14px;
`;
interface ChipProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, disabled, icon }) => {
  const isInteractive = !!onClick;

  return (
    <StyledChip
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
      {icon && <span>{icon}</span>}
    </StyledChip>
  );
};

export default Chip;
