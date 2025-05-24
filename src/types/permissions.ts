import { RoleState } from "./next-auth";

export enum Permission_Keys {
  ACCESS_ANALYTICS = "access_analytics",
  VIEW_JOBS = "view_jobs",
  MANAGE_USERS = "manage_users",
  MANAGE_COMPANY_PROFILE = "manage_company_profile",
  EDIT_PAYMENT_METHOD_AND_PAYMENT_PLAN = "edit_payment_method_&_payment_plan",
  HANDLE_INVOICING = "handle_invoicing",
  MANAGE_SUBSCRIPTIONS_AND_PAYMENTS = "manage_subscriptions_and_payments",
  SEARCH_CANDIDATE = "search_candidate",
  ACCESS_FINANCIAL_REPORTS = "access_financial_reports",
  EXPORT_JOB_APPLICANTS_TO_FILE = "export_job_applicants_to_file",
  MANAGE_JOB_APPLICATIONS = "manage_job_applications",
  VIEW_ALL_APPLICANTS = "view_all_applicants",
  SCHEDULE_INTERVIEWS = "schedule_interviews",
  COMMUNICATE_WITH_CANDIDATES = "communicate_with_candidates",
  UNLOCK_SEEKER = "unlock_seeker",
  VIEW_SAVED_SEEKERS = "view_saved_seekers",
  VIEW_JOB_APPLICANTS = "view_job_applicants",
  POST_JOB = "post_job",
  MANAGE_JOBS = "manage_jobs"
}


export interface RoleFormData {
  id?: string;
  forUserType: RoleState;
  name: string;
  description: string;
  permissionsIds: {
    ids: string[];
  };
  companyId: string;
}