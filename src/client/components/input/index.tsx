const Input = ({
  type,
  name,
  label,
  className,
  required,
  ...rest
}: {
  type: "textarea" | "text" | "email" | "number";
  name: string;
  label: string;
  className?: string;
  required?: boolean;
}) => {
  return type === "textarea" ? (
    <textarea className={className} required={required} {...rest} />
  ) : (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} className={className} required={required} {...rest} />
    </div>
  );
};

export default Input;
