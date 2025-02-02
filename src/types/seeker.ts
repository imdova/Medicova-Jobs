export type JobApplicationData = {
  id: string;
  seekerId: string;
  jobId: string;
  answers?: { [key: string]: string };
};

export interface ApplicationsFilter {
  page?: number;
  limit?: number;
  jobId?: string;
  seekerId?: string;
  companyId?: string;
  startDate?: string;
}
