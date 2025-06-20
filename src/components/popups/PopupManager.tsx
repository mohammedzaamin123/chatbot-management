
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalyticsPopup } from './AnalyticsPopup';
import { ConfirmationPopup } from './ConfirmationPopup';
import { QuickActionPopup } from './QuickActionPopup';
import { ChatbotConfigPopup } from './ChatbotConfigPopup';
import { ContentGeneratorPopup } from './ContentGeneratorPopup';
import { CampaignSetupPopup } from './CampaignSetupPopup';
import { DatabaseConnectionPopup } from './DatabaseConnectionPopup';
import { TenantManagementPopup } from './TenantManagementPopup';
import { MessageReplyPopup } from './MessageReplyPopup';
import { AutomationFlowPopup } from './AutomationFlowPopup';

interface PopupContextType {
  openAnalytics: () => void;
  openQuickActions: () => void;
  openChatbotConfig: (chatbotId?: string) => void;
  openContentGenerator: () => void;
  openCampaignSetup: () => void;
  openDatabaseConnection: () => void;
  openTenantManagement: (tenantId?: string) => void;
  openMessageReply: (messageId: string) => void;
  openAutomationFlow: () => void;
  openConfirmation: (props: Omit<ConfirmationProps, 'isOpen' | 'onClose'>) => void;
}

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'danger' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopups = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopups must be used within a PopupProvider');
  }
  return context;
};

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [activePopups, setActivePopups] = useState<{
    analytics: boolean;
    quickActions: boolean;
    chatbotConfig: { open: boolean; chatbotId?: string };
    contentGenerator: boolean;
    campaignSetup: boolean;
    databaseConnection: boolean;
    tenantManagement: { open: boolean; tenantId?: string };
    messageReply: { open: boolean; messageId?: string };
    automationFlow: boolean;
    confirmation: { open: boolean; props?: Omit<ConfirmationProps, 'isOpen' | 'onClose'> };
  }>({
    analytics: false,
    quickActions: false,
    chatbotConfig: { open: false },
    contentGenerator: false,
    campaignSetup: false,
    databaseConnection: false,
    tenantManagement: { open: false },
    messageReply: { open: false },
    automationFlow: false,
    confirmation: { open: false }
  });

  const openAnalytics = () => setActivePopups(prev => ({ ...prev, analytics: true }));
  const closeAnalytics = () => setActivePopups(prev => ({ ...prev, analytics: false }));

  const openQuickActions = () => setActivePopups(prev => ({ ...prev, quickActions: true }));
  const closeQuickActions = () => setActivePopups(prev => ({ ...prev, quickActions: false }));

  const openChatbotConfig = (chatbotId?: string) => 
    setActivePopups(prev => ({ ...prev, chatbotConfig: { open: true, chatbotId } }));
  const closeChatbotConfig = () => 
    setActivePopups(prev => ({ ...prev, chatbotConfig: { open: false } }));

  const openContentGenerator = () => setActivePopups(prev => ({ ...prev, contentGenerator: true }));
  const closeContentGenerator = () => setActivePopups(prev => ({ ...prev, contentGenerator: false }));

  const openCampaignSetup = () => setActivePopups(prev => ({ ...prev, campaignSetup: true }));
  const closeCampaignSetup = () => setActivePopups(prev => ({ ...prev, campaignSetup: false }));

  const openDatabaseConnection = () => setActivePopups(prev => ({ ...prev, databaseConnection: true }));
  const closeDatabaseConnection = () => setActivePopups(prev => ({ ...prev, databaseConnection: false }));

  const openTenantManagement = (tenantId?: string) => 
    setActivePopups(prev => ({ ...prev, tenantManagement: { open: true, tenantId } }));
  const closeTenantManagement = () => 
    setActivePopups(prev => ({ ...prev, tenantManagement: { open: false } }));

  const openMessageReply = (messageId: string) => 
    setActivePopups(prev => ({ ...prev, messageReply: { open: true, messageId } }));
  const closeMessageReply = () => 
    setActivePopups(prev => ({ ...prev, messageReply: { open: false } }));

  const openAutomationFlow = () => setActivePopups(prev => ({ ...prev, automationFlow: true }));
  const closeAutomationFlow = () => setActivePopups(prev => ({ ...prev, automationFlow: false }));

  const openConfirmation = (props: Omit<ConfirmationProps, 'isOpen' | 'onClose'>) =>
    setActivePopups(prev => ({ ...prev, confirmation: { open: true, props } }));
  const closeConfirmation = () => 
    setActivePopups(prev => ({ ...prev, confirmation: { open: false } }));

  const contextValue: PopupContextType = {
    openAnalytics,
    openQuickActions,
    openChatbotConfig,
    openContentGenerator,
    openCampaignSetup,
    openDatabaseConnection,
    openTenantManagement,
    openMessageReply,
    openAutomationFlow,
    openConfirmation
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      
      {/* Render all popups */}
      <AnalyticsPopup 
        isOpen={activePopups.analytics} 
        onClose={closeAnalytics} 
      />
      
      <QuickActionPopup 
        isOpen={activePopups.quickActions} 
        onClose={closeQuickActions} 
      />
      
      <ChatbotConfigPopup 
        isOpen={activePopups.chatbotConfig.open} 
        onClose={closeChatbotConfig}
        chatbotId={activePopups.chatbotConfig.chatbotId}
      />
      
      <ContentGeneratorPopup 
        isOpen={activePopups.contentGenerator} 
        onClose={closeContentGenerator} 
      />
      
      <CampaignSetupPopup 
        isOpen={activePopups.campaignSetup} 
        onClose={closeCampaignSetup} 
      />
      
      <DatabaseConnectionPopup 
        isOpen={activePopups.databaseConnection} 
        onClose={closeDatabaseConnection} 
      />
      
      <TenantManagementPopup 
        isOpen={activePopups.tenantManagement.open} 
        onClose={closeTenantManagement}
        tenantId={activePopups.tenantManagement.tenantId}
      />
      
      {activePopups.messageReply.messageId && (
        <MessageReplyPopup 
          isOpen={activePopups.messageReply.open} 
          onClose={closeMessageReply}
          messageId={activePopups.messageReply.messageId}
        />
      )}
      
      <AutomationFlowPopup 
        isOpen={activePopups.automationFlow} 
        onClose={closeAutomationFlow} 
      />
      
      {activePopups.confirmation.props && (
        <ConfirmationPopup 
          isOpen={activePopups.confirmation.open}
          onClose={closeConfirmation}
          {...activePopups.confirmation.props}
        />
      )}
    </PopupContext.Provider>
  );
};
