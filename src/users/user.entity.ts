export interface SubjectRole {
  subject: string; // e.g. 'Invoices'
  role: string;    // e.g. 'Editor', 'Viewer'
}

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  fullName: string;
  position: string;   // Manager, Staff, IT, Admin
  department: string;
  company: string;
  subjects: SubjectRole[];
}
