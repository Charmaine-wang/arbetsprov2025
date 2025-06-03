import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: blue;
    border-color: blue;
    color: #fff;
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
