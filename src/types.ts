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
