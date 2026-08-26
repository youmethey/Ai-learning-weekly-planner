import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const getTheme = () => {
    switch (toast.type) {
      case 'success':
        return { bg: 'var(--pastel-mint-light)', border: 'var(--pastel-mint-soft)', color: '#1B6E44', icon: CheckCircle };
      case 'warning':
        return { bg: 'var(--pastel-butter-light)', border: 'var(--pastel-butter-soft)', color: '#8A5D00', icon: AlertCircle };
      case 'error':
        return { bg: 'var(--pastel-pink-light)', border: 'var(--pastel-pink-soft)', color: '#B52B4E', icon: AlertCircle };
      default:
        return { bg: 'var(--pastel-purple-light)', border: 'var(--pastel-purple-soft)', color: '#5C3F8C', icon: Sparkles };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '24px',
      zIndex: 99999,
      background: theme.bg,
      border: `1.5px solid ${theme.border}`,
      borderRadius: 'var(--radius-md)',
      padding: '12px 18px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      maxWidth: '380px',
      animation: 'modalScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      <IconComponent size={20} color={theme.color} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: theme.color, flex: 1 }}>
        {toast.message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: theme.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
