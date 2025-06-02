import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  margin: 24px 0;
  font-family: sans-serif;
`;

const StyledInput = styled.input`
  padding: 16px 12px 8px 12px;
  font-size: 16px;
  border: 1px solid rgba(102, 102, 102, 1);
  border-radius: 4px;
  outline: none;
  background: none;

  &:focus {
    border-color: blue;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 10px;
    font-size: 12px;
    background: white;
    padding: 0 4px;
  }

  &:focus + label {
    color: blue;
  }
  &:not(:placeholder-shown) + label {
    color: #000;
  }

  &::placeholder {
    opacity: 0;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 16px;
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const Input = ({
  type,
  name,
  label,
  className,
  required,
  onChange,
  ...rest
}: {
  type: "textarea" | "text" | "email" | "number";
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return type === "textarea" ? (
    <textarea className={className} required={required} {...rest} />
  ) : (
    <InputWrapper>
      <StyledInput
        type={type}
        className={className}
        required={required}
        placeholder={label}
        {...rest}
        onChange={onChange}
      />
      <FloatingLabel htmlFor={name}>{label}</FloatingLabel>
    </InputWrapper>
  );
};

export default Input;
