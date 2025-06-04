import styled, { css } from "styled-components";

const StyledButton = styled.button`
  ${({ theme }) => css`
    font-size: 16px;
    padding: ${theme.spacing.xsmall} ${theme.spacing.small};
    background-color: ${theme.color.button};
    border: 1px solid ${theme.color.button};
    color: ${theme.color.buttonContrast};
    border-radius: ${theme.border.radius.xsmall};
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xsmall};
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.buttonHover};
      border-color: ${theme.color.buttonHover};
      color: ${theme.color.buttonContrast};
    }
    &:disabled {
      background-color: ${theme.color.buttonDisabled};
      border-color: ${theme.color.buttonDisabledContrast};
      color: ${theme.color.buttonDisabledContrast};
      cursor: not-allowed;
    }
  `}
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <StyledButton className={className} {...rest}>
      {children}
    </StyledButton>
  );
};
