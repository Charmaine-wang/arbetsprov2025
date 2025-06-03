import styled from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 16px 12px 8px 12px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 1);
  outline: none;
  background: none;

  &:focus {
    border-color: blue;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 8px;
    font-size: 14px;
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
  top: 14px;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
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
  error,
  value,
  ...rest
}: {
  type: "textarea" | "text" | "email" | "number";
  name: string;
  label: string;
  className?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  value?: string;
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
        value={value}
      />
      <FloatingLabel htmlFor={name}>{label}</FloatingLabel>
      {error ? (
        <p style={{ color: "#FF4924", fontSize: "12px", margin: "4px 0" }}>
          {error}
        </p>
      ) : (
        <span style={{ height: "14px", margin: "4px 0" }}></span>
      )}
    </InputWrapper>
  );
};

export default Input;
