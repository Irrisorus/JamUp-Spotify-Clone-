import './Button.css';

function Button({ children, type = 'button', disabled, isLoading, onClick }) {
  return (
    <button
      type={type}
      className={`spotify-button ${isLoading ? 'loading' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <span className="loading-spinner"></span>}
      <span className="button-text">{children}</span>
    </button>
  );
}

export default Button;