import { useState } from 'react';
import './InputField.css';

function InputField({ 
  type, 
  name, 
  label, 
  value, 
  onChange, 
  onBlur, 
  error, 
  placeholder,
  showToggle,
  toggleVisibility,
  isVisible
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  const fieldHasValue = value && value.length > 0;
  
  return (
    <div className={`input-field ${isFocused ? 'focused' : ''} ${error ? 'has-error' : ''} ${fieldHasValue ? 'has-value' : ''}`}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      
      <div className="input-container">
        <input
          type={type}
          id={name}
          name={name}
          className="input-control"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
        
        {showToggle && (
          <button 
            type="button" 
            className="toggle-visibility"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
      
      {error && <div className="input-error">{error}</div>}
    </div>
  );
}

export default InputField;