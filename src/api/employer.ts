import { API_URL } from ".";

export const API_EMPLOYER_BASE = API_URL + "/api/v1.0.0/employer";
// Companies
export const COMPANIES = API_EMPLOYER_BASE + "/companies";
// export const API_CREATE_COMPANY = COMPANIES; // POST
// export const API_GET_COMPANIES = COMPANIES; // GET
export const API_GET_COMPANY_BY_USER_NAME = COMPANIES + "/userName/"; // GET
export const API_GET_COMPANY_BY_ID = COMPANIES + "/"; // GET + [companyID]
export const API_UPDATE_COMPANY_USER_NAME = COMPANIES + "/userName"; // PATCH
export const API_UPDATE_COMPANY = COMPANIES + "/"; // PATCH + [companyID]
// export const API_DELETE_COMPANY = COMPANIES + "/"; // DELETE + [companyID]

// Jobs
export const JOBS = API_EMPLOYER_BASE + "/jobs";
export const API_CREATE_JOB = JOBS; // POST
export const API_GET_JOBS = JOBS; // GET
export const API_GET_JOB_BY_ID = JOBS + "/"; // GET + [jobID]
export const API_GET_JOBS_BY_COMPANY_ID = JOBS + "/company/"; // GET + [companyID]
export const API_UPDATE_JOB = JOBS + "/"; // PATCH + [jobID]
export const API_DELETE_JOB = JOBS + "/"; // DELETE + [jobID]

// Job Applications
export const JOB_APPLICATIONS = API_EMPLOYER_BASE + "/applications";
export const API_CREATE_JOB_APPLICATION = JOB_APPLICATIONS; // POST
export const API_UPDATE_JOB_APPLICATION = JOB_APPLICATIONS; // PATCH + [jobApplicationID]
export const API_GET_JOB_APPLICATIONS = JOB_APPLICATIONS; // GET ?page=1&limit=10&jobId={id}&seekerId={id}&companyId={id}&startDate={date}
export const API_GET_JOB_APPLICATION_BY_ID = JOB_APPLICATIONS + "/"; // GET + [jobApplicationID]
export const API_GET_JOB_APPLICATION_STATUS_COUNT_FOR_SEEKER =
  JOB_APPLICATIONS + "/seeker/"; // GET + [seekerID] + "/status-count"

  // unlocked lists
export const UNLOCKED_SEEKERS = API_EMPLOYER_BASE + "/unlocked-seekers";
export const API_UNLOCK_SEEKER = UNLOCKED_SEEKERS; // POST "{companyId , seekerId}"
export const API_GET_UNLOCKED_SEEKERS = UNLOCKED_SEEKERS; // GET ?id={id}
export const API_CHECK_UNLOCKED_SEEKER = UNLOCKED_SEEKERS + "/company/"; // GET + {companyId}/seeker/{seekerId}
export const API_DELETE_UNLOCKED_SEEKER = UNLOCKED_SEEKERS + "/company/"; // DELETE + {companyId}/seeker/{seekerId}
