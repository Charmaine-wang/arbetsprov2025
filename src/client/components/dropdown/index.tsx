import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { ChevronDownIcon } from "../icons/chevron-down";

const DropdownContainer = styled.div`
  width: 200px;
  font-family: Arial, sans-serif;
  position: relative;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  text-align: left;
`;

const OptionsList = styled.ul`
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  overflow-y: auto;
  background: white;
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const OptionItem = styled.li<{ disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #f0f0f0;
    `}
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SimpleDropdown = ({
  options,
  label,
  disabledOptions,
  onChange,
}: {
  options: { label: string; value: string }[];
  label: string;
  disabledOptions?: string[];
  onChange: (option: { label: string; value: string }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const onSelectOption = (option: { label: string; value: string }) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <DropdownContainer>
      <SelectButton onClick={toggleDropdown}>
        {selected ? selected.label : label}
        <ChevronDownIcon size={12} />
      </SelectButton>

      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => onSelectOption(option)}
              disabled={
                disabledOptions?.some(
                  (disabled) => disabled === option.value
                ) || false
              }
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </DropdownContainer>
  );
};

export default SimpleDropdown;
