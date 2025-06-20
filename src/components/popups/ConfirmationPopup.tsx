
import React from 'react';
import { Popup } from '../ui/popup';
import { Button } from '../ui/button';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'danger' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  const iconMap = {
    warning: AlertTriangle,
    danger: XCircle,
    info: Info,
    success: CheckCircle,
  };

  const colorMap = {
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    info: 'text-blue-500',
    success: 'text-green-500',
  };

  const buttonColorMap = {
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    danger: 'bg-red-500 hover:bg-red-600',
    info: 'btn-primary',
    success: 'bg-green-500 hover:bg-green-600',
  };

  const Icon = iconMap[type];

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={!isLoading}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${colorMap[type]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        <p className="text-muted-foreground font-inter">{message}</p>
      </div>

      <div className="flex justify-end gap-2 pt-6">
        <Button 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button 
          className={buttonColorMap[type]}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Loading...
            </>
          ) : (
            confirmText
          )}
        </Button>
      </div>
    </Popup>
  );
};
