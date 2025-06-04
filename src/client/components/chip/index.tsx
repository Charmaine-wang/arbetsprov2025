import { ReactNode } from "react";
import React from "react";
import { styled, css } from "styled-components";

const StyledChip = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.small};
    border: 1px solid ${theme.color.lightGray};
    border-radius: ${theme.border.radius.xlarge};
    padding: ${theme.spacing.xsmall} ${theme.spacing.small};
    font-size: 14px;
  `}
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  &:hover {
    background-color: #cecece;
  }
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
      role={"status"}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <span>{label}</span>
      {onClick && icon ? (
        <IconButton onClick={disabled ? undefined : onClick}>{icon}</IconButton>
      ) : icon ? (
        icon
      ) : null}
    </StyledChip>
  );
};

export default Chip;
