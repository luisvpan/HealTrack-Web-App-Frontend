export interface User {
  id: 3;
  name: string;
  lastname: string;
  email: string;
  identification: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export enum AllRoles {
  ADMIN = "admin",
  SPECIALIST = "specialist",
  ASSISTANT = "assistant",
  PATIENT = "patient",
}

export enum TranslatedRole {
  admin = "Administrador",
  specialist = "Especialista",
  assistant = "Enfermero",
  patient = "Paciente",
}

export interface Chat {
  id: number;
  title: string;
  unread_messages_count: number;
  createdAt: string;
  updatedAt: string;
  users: User[];
  last_message: {
    id: string;
    message: string;
    was_edited: boolean;
    createdAt: string;
    updatedAt: string;
  };
  created_by: User;
}

export interface Message {
  id: string;
  message: string;
  was_edited: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  attachment: string;
}

export interface MessagesData {
  count: number;
  data: Message[];
}

export interface ChatInfo {
  id: number;
  title: string;
  unread_messages_count: number;
  createdAt: string;
  updatedAt: string;
  users: User[];
  created_by: User;
}

export interface Report {
  id: number;
  isRespondingForEmployee: boolean;
  hasHighTemperature: boolean;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasSecretions: boolean;
  fileUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
}
