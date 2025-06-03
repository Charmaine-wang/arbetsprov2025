import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { ChevronDownIcon } from "../icons/chevron-down";
import { CheckIcon } from "../icons/check";

const DropdownContainer = styled.div`
  width: 200px;
  font-family: Arial, sans-serif;
  position: relative;
`;
const FloatingLabel = styled.label<{ isFloating: boolean }>`
  position: absolute;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  pointer-events: none;
  transition: all 0.2s ease;
  background: white;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ isFloating }) =>
    isFloating
      ? css`
          top: -8px;
          left: 8px;
          font-size: 14px;
        `
      : css`
          width: 170px;
          top: 14px;
          left: 12px;
        `}
`;
const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44.5px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #000;
  background: white;
  cursor: pointer;
  text-align: left;

  &:focus {
    border-color: blue;
  }
`;

const OptionsList = styled.ul`
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 1px solid #000;
  max-height: 200px;
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
      cursor: not-allowed;
      background-color: #f0f0f0;
    `}
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const Dropdown = ({
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  };

  const onSelectOption = (option: { label: string; value: string }) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0) {
          const option = options[focusedIndex];
          const isDisabled = disabledOptions?.includes(option.value);
          if (!isDisabled) {
            onSelectOption(option);
          }
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  return (
    <DropdownContainer ref={dropdownRef} onKeyDown={handleKeyDown}>
      <SelectButton onClick={toggleDropdown}>
        {selected ? (
          <>
            {selected.label}
            <ChevronDownIcon size={12} />
          </>
        ) : (
          ""
        )}
      </SelectButton>
      <FloatingLabel isFloating={isOpen || !!selected}>
        {label} {isOpen || (!selected && <ChevronDownIcon size={12} />)}
      </FloatingLabel>

      {isOpen && (
        <OptionsList>
          {options.map((option, index) => {
            const isDisabled =
              disabledOptions?.some((disabled) => disabled === option.value) ||
              false;
            const noop = () => {};
            return (
              <OptionItem
                key={option.value}
                role="option"
                onClick={() => (isDisabled ? noop() : onSelectOption(option))}
                disabled={isDisabled}
                aria-selected={focusedIndex === index}
                style={{
                  backgroundColor:
                    focusedIndex === index ? "#e0e0e0" : undefined,
                }}
                ref={(el) => (optionRefs.current[index] = el)}
              >
                {option.label}
                {isDisabled ? (
                  <span>
                    <CheckIcon />
                  </span>
                ) : null}
              </OptionItem>
            );
          })}
        </OptionsList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
