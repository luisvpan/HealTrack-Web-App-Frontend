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

// Patient
export enum SexType {
  SEX1 = "M",
  SEX2 = "F",
}

export interface Hospital {
  name: string;
}

export interface Employee {
  id: number;
  user: User;
  hospital: Hospital;
  deletedAt: Date;
}

export enum SurgeryType {
  SURGERYTYPE1 = "A",
  SURGERYTYPE2 = "B",
  SURGERYTYPE3 = "C",
}

export enum StatusPatient {
  ACTIVE = "active",
  INACTIVE = "inactive",
  EMERGENCY = "emergency",
  CLOSED = "closed",
}

export enum TranslatedPatientStatus {
  active = "En seguimiento",
  inactive = "Dado de Alta",
  emergency = "Hospitalizado",
  closed = "Caso Cerrado",
}

export const StatusPatientOptions = [
  { label: TranslatedPatientStatus.active, value: StatusPatient.ACTIVE },
  { label: TranslatedPatientStatus.inactive, value: StatusPatient.INACTIVE },
  { label: TranslatedPatientStatus.emergency, value: StatusPatient.EMERGENCY },
  { label: TranslatedPatientStatus.closed, value: StatusPatient.CLOSED },
];

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedReportResult {
  data: Report[];
  paginationData: PaginationData;
}

export interface Patient {
  id: number;
  user: User;
  age: number;
  sex: SexType;
  address: string;
  personalPhone: string;
  homePhone: string;
  hospital: Hospital;
  surgeryDate: string;
  surgeryProcedure: string;
  surgeryType: SurgeryType;
  automaticTracking: boolean;
  status: StatusPatient;
  deletedAt: Date;
  medic: Employee;
  patientReports?: PaginatedReportResult;
}

// Roles
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
  surgeryExpense: string;
  surgeryExpenseAmount: number;
  additionalInformation: string | null;
  fileUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
}

// MessageNotifications
export interface MessageNotification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  user: User;
}

// Notifications
export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  deletedAt: Date;
  employee: Employee;
}

// Reccomendations
export interface Recommendation {
  id: number;
  title: string;
  content: string;
}

// FAQs
export interface FAQs {
  id: number;
  question: string;
  answer: string;
}

// AppForm
export interface AppFormulary {
  id: number;
  isRespondingForEmployee: boolean;
  likeApp: string;
  innescesaryDificultToUse: string;
  easyToUse: string;
  needExpertSupport: string;
  wellIntegratedFunctions: string;
  manyContradictions: string;
  peopleLearnQuickly: string;
  tediousToUse: string;
  feltConfidentUsing: string;
  neededKnowledgeBeforeUse: string;
  additionalInformation: string | null;
  createdAt: string;
  deletedAt: string | null;
  user: User;
}