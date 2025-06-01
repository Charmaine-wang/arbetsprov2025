const Dropdown = ({
  options,
  name,
  label,
  multiple,
  onChange,
}: {
  options: { label: string; value: string }[];
  name: string;
  label: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <select name={name} multiple={multiple} onChange={onChange}>
      <option value={name}>{label}</option>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
