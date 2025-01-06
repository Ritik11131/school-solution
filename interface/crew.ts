// types/Crew.ts

export interface CrewMember {
    id: number; // Assuming id is a number
    isPilot: boolean;
    isHelper: boolean;
    isTeacher: boolean;
    licenseNumber: string;
    emergencyContact: string;
    name: string;
    email: string;
    contactNumber: string;
  }
  
  export interface CrewResponse {
    status: string;
    message: string;
    data: CrewMember[];
  }