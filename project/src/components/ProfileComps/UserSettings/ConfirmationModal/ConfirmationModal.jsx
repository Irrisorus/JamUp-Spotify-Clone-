import { useEffect, useRef } from 'react'
import './ConfirmationModal.css'

const ConfirmationModal = ({ 
  title, 
  message, 
  confirmText, 
  cancelText, 
  onConfirm, 
  onCancel,
  isProcessing = false,
  confirmType = 'primary' 
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
   
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    firstElement.focus()
    
    const handleKeyDown = (e) => {
      
      if (e.key === 'Escape') {
        onCancel()
        return
      }
      
      
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }
    
    
    document.body.style.overflow = 'hidden'
    
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div 
        className="modal" 
        ref={modalRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        
        <div className="modal-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onCancel}
            disabled={isProcessing}
          >
            {cancelText || 'Cancel'}
          </button>
          
          <button 
            type="button" 
            className={`btn-${confirmType}`}
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner-small"></span>
                {confirmText || 'Confirm'}...
              </>
            ) : (
              confirmText || 'Confirm'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal