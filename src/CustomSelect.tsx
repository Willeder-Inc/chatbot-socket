import React, { useState } from "react"
import "./CustomSelect.css"

// Define the type for the option object
type Option = {
  label: React.ReactNode
  value: string
} | null

type CustomSelectProps = {
  options: Option[]
  onChange?: (option: Option) => void
  defaultValue: Option
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const [selectedOption, setSelectedOption] = useState<Option>(null)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option)
    if (onChange) {
      onChange(option)
    }
    toggleDropdown()
  }

  return (
    <>
      <div className="custom-select">
        <div
          className={`select-box ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          {selectedOption?.label || defaultValue?.label}
          <div className="arrow-icon">&#9662;</div>
        </div>
        {isOpen && (
          <ul className="options-list">
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionChange(option)}>
                {option?.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default CustomSelect
