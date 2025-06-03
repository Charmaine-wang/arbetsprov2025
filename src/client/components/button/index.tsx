import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background-color: blue;
    border-color: blue;
    color: #fff;
  }
  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    color: #fff;
    cursor: not-allowed;
  }
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
