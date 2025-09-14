import { useState } from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import SocialButton from '../SocialButton/SocialButton';
import './RegistrationForm.css';



function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // очищение ошибочек
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // валидация
    if (name === 'email') {
      if (!value) {
        setErrors({ ...errors, email: 'Email is required' });
      } else if (!validateEmail(value)) {
        setErrors({ ...errors, email: 'Please enter a valid email' });
      }
    }
    
    if (name === 'password') {
      if (!value) {
        setErrors({ ...errors, password: 'Password is required' });
      } else if (!validatePassword(value)) {
        setErrors({ ...errors, password: 'Password must be at least 8 characters' });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // валидация полей
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // подтверждение формы
    setIsSubmitting(true);
    
    // сброс формы
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      
      // setFormData({ email: '', password: '', rememberMe: false });
    }, 1500);
  };

  return (
    <div className="registration-container">
      <div className="registration-form-wrapper">
        <div className="registration-header">
          <h1>Sign up for free to start listening</h1>
        </div>
        
        <div className="social-buttons">
          
          <SocialButton label="Continue with Google" />
        </div>
        
        <div className="divider">
          <span>or</span>
        </div>
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            placeholder="name@example.com"
          />
          
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            placeholder="Create a password"
            showToggle
            toggleVisibility={togglePasswordVisibility}
            isVisible={showPassword}
          />
          
          <div className="remember-me">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Remember me</span>
            </label>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        
        <div className="login-link">
          <p>No account? <a href="#">Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;