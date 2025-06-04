import styled, { css } from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  ${({ theme }) => css`
    padding: ${theme.spacing.small} 12px ${theme.spacing.xsmall} 12px;
    font-size: ${theme.typography.body1.fontSize};
    border: 1px solid ${theme.color.black};
    outline: none;
    background: none;

    &:focus {
      border-color: ${theme.color.button};
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -8px;
      left: 8px;
      font-size: 14px;
      background: ${theme.color.white};
      padding: 0 ${theme.spacing.xxsmall};
    }

    &:focus + label {
      color: ${theme.color.button};
    }

    &::placeholder {
      opacity: 0;
    }

    &:hover {
      border-color: ${theme.color.button};
    }
  `}
`;

const ErrorMessage = styled.p`
  color: #ff4924;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  margin: 4px 0;
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 14px;
  color: rgba(0, 0, 0, 1);
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
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
  onBlur,
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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
        onBlur={onBlur}
      />
      <FloatingLabel htmlFor={name}>{label}</FloatingLabel>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <span style={{ height: "14px", margin: "4px 0" }}></span>
      )}
    </InputWrapper>
  );
};

export default Input;
