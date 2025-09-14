import './SocialButton.css';
import { FaGoogle } from "react-icons/fa";
function SocialButton({ icon, label, onClick }) {
  return (
    <button className="social-button" onClick={onClick} type="button">
      <FaGoogle className="social-icon"/>
      <span className="social-label">{label}</span>
    </button>
  );
}

export default SocialButton;