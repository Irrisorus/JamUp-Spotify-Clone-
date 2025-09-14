import { useEffect, useRef, useState } from 'react';
import { IoMailSharp } from "react-icons/io5";
import './EmailVerification.css';

const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  // Set up the timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendActive(true);
    }
  }, [timeLeft]);

  // Auto-focus on first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow numerical inputs
    if (!/^\d*$/.test(value)) return;

    // Update the code state
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus to next input if value exists
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Handle paste event
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').split('').slice(0, 6);
        
        if (digits.length) {
          const newCode = [...code];
          digits.forEach((digit, i) => {
            if (i < 6) newCode[i] = digit;
          });
          setCode(newCode);
          
          // Focus the next empty input or the last one
          const nextEmptyIndex = newCode.findIndex(val => val === '');
          if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex].focus();
          } else {
            inputRefs.current[5].focus();
          }
        }
      });
    }
  };

  const handleResendCode = () => {
    // Here you would implement the actual code resending logic
    setTimeLeft(60);
    setIsResendActive(false);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
    <div className="email-verification-container">
      <div className="email-verification-card">
        <div className="email-icon">
          <IoMailSharp size={24}/>
        </div>
        
        <h1>Email Verification</h1>
        
        <p className="verification-message">
          We've sent a verification code to your email address.
          <br />Please enter it below.
        </p>
        
        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="code-input"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="resend-section">
          {isResendActive ? (
            <button onClick={handleResendCode} className="resend-button">
              Resend code
            </button>
          ) : (
            <p className="timer">
              Resend code in <span className="time-value">{timeLeft}</span> seconds
            </p>
          )}
        </div>
        
        <p className="help-text">
          Didn't receive the code? Check your spam folder or try
          resending when the timer expires.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;