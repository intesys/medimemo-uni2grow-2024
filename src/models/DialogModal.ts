export interface IModalDialog {
    icon ?: React.ReactNode;
    open: boolean;
    title ?: string;
    content?: string;
    agreeMessage?: string;
    disagreeMessage: string;
    agreeIcon?:React.ReactNode;
    disagreeIcon?: React.ReactNode;
    onAgree?: () => void; 
    onDisagree: () => void;
  }
  