export type JobApplicationData = {
  id:string;
  seekerId: string;
  jobId: string;
  answers?: { [key: string]: string };
};