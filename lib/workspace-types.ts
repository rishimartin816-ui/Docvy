export type WorkspaceClinic = {id:string;name:string;city:string;address:string;role:string};
export type WorkspaceDoctor = {id:string;name:string;specialty:string;present:boolean|null;providerId:string|null};
export type WorkspaceSlot = {id:string;startsAt:string;endsAt:string;blocked:boolean;doctorId:string;bookingId:string|null;status:string|null;patientId:string|null;patientName:string|null;feePaise:number|null;paidPaise:number|null};
export type WorkspacePatient = {id:string;name:string;phone:string;email:string|null;created_at:string};
export type WorkspaceAppointment = {id:string;slot_id:string;status:string;created_at:string;starts_at:string;ends_at:string;doctor_id:string;patient_name:string|null;fee_paise:number|null;paid_paise:number|null};
export type WorkspaceLead = {id:string;reference:string;name:string;phone:string;email:string|null;date:string;time:string;status:string;provider_id:string;created_at:string};
export type WorkspaceData = {
 email:string; platformAdmin:boolean; clinics:WorkspaceClinic[]; role?:string;canSchedule?:boolean;canManage?:boolean;
 summary?:{appointmentCount:number;cancelledCount:number;feePaise:number|null;netReceiptsPaise:number|null;daily:{day:string;count:number}[]};
 doctors?:WorkspaceDoctor[];slots?:WorkspaceSlot[];patients?:WorkspacePatient[];appointments?:WorkspaceAppointment[];leads?:WorkspaceLead[];
 team?:{id:string;email:string;role:string;active:boolean;doctor_id:string|null}[];
 invites?:{email:string;role:string;expiresAt:string;acceptedAt:string|null}[];
 audit?:{action:string;entity_id:string|null;created_at:string}[];
 payments?:{id:string;booking_id:string;amount_paise:number;kind:"payment"|"refund";method:string;created_at:string}[];
};
