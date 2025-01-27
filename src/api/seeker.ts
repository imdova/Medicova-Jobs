import { API_URL } from ".";

export const API_SEEKER_BASE = API_URL + "/seeker/api/v1.0";

// User Profiles
export const SEEKER_PROFILES = API_SEEKER_BASE + "/seekers-profiles";
export const API_GET_SEEKERS = SEEKER_PROFILES; // GET
export const API_GET_SEEKER_BY_IDENTIFIER = SEEKER_PROFILES + "/"; // GET + [identifier]
export const API_UPDATE_SEEKER = SEEKER_PROFILES + "/"; // PATCH + [id]
export const API_DELETE_SEEKER = SEEKER_PROFILES + "/"; // DELETE + [id]
export const API_CALCULATE_COMPLETENESS = SEEKER_PROFILES + "/{id}/calculate-completeness"; // GET + [id]

// User Activities
export const SEEKER_ACTIVITIES = API_SEEKER_BASE + "/seeker-activities";
export const API_CREATE_SEEKER_ACTIVITY = SEEKER_ACTIVITIES; // POST
export const API_GET_SEEKER_ACTIVITIES = SEEKER_ACTIVITIES + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_ACTIVITY_BY_ID = SEEKER_ACTIVITIES + "/"; // GET + [id]
export const API_UPDATE_SEEKER_ACTIVITY = SEEKER_ACTIVITIES + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_ACTIVITY = SEEKER_ACTIVITIES + "/"; // DELETE + [id]

// Career Preferences
export const CAREER_PREFERENCES = API_SEEKER_BASE + "/career-preferences";
export const API_CREATE_CAREER_PREFERENCE = CAREER_PREFERENCES; // POST
export const API_GET_CAREER_PREFERENCES = CAREER_PREFERENCES + "/seeker/"; // GET + [seekerId]
export const API_GET_CAREER_PREFERENCE_BY_ID = CAREER_PREFERENCES + "/"; // GET + [id]
export const API_UPDATE_CAREER_PREFERENCE = CAREER_PREFERENCES + "/"; // PATCH + [id]
export const API_DELETE_CAREER_PREFERENCE = CAREER_PREFERENCES + "/"; // DELETE + [id]

// User Courses
export const SEEKER_COURSES = API_SEEKER_BASE + "/seeker-courses";
export const API_CREATE_SEEKER_COURSE = SEEKER_COURSES; // POST
export const API_GET_SEEKER_COURSES = SEEKER_COURSES + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_COURSE_BY_ID = SEEKER_COURSES + "/"; // GET + [id]
export const API_UPDATE_SEEKER_COURSE = SEEKER_COURSES + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_COURSE = SEEKER_COURSES + "/"; // DELETE + [id]

// User Education
export const SEEKER_EDUCATION = API_SEEKER_BASE + "/seeker-education";
export const API_CREATE_SEEKER_EDUCATION = SEEKER_EDUCATION; // POST
export const API_GET_SEEKER_EDUCATION = SEEKER_EDUCATION + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_EDUCATION_BY_ID = SEEKER_EDUCATION + "/"; // GET + [id]
export const API_UPDATE_SEEKER_EDUCATION = SEEKER_EDUCATION + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_EDUCATION = SEEKER_EDUCATION + "/"; // DELETE + [id]

// User Experience
export const SEEKER_EXPERIENCE = API_SEEKER_BASE + "/seeker-experience";
export const API_CREATE_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE; // POST
export const API_GET_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_EXPERIENCE_BY_ID = SEEKER_EXPERIENCE + "/"; // GET + [id]
export const API_UPDATE_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE + "/"; // DELETE + [id]

// User Skills
export const SEEKER_SKILLS = API_SEEKER_BASE + "/seeker-skills";
export const API_CREATE_SEEKER_SKILL = SEEKER_SKILLS; // POST
export const API_GET_SEEKER_SKILLS = SEEKER_SKILLS + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_SKILL_BY_ID = SEEKER_SKILLS + "/"; // GET + [id]
export const API_UPDATE_SEEKER_SKILL = SEEKER_SKILLS + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_SKILL = SEEKER_SKILLS + "/"; // DELETE + [id]

// Job Applications
export const JOB_APPLICATIONS = API_SEEKER_BASE + "/job-applications";
export const API_CREATE_JOB_APPLICATION = JOB_APPLICATIONS; // POST
export const API_GET_JOB_APPLICATIONS = JOB_APPLICATIONS; // GET
export const API_GET_JOB_APPLICATION_BY_ID = JOB_APPLICATIONS + "/"; // GET + [id]
export const API_UPDATE_JOB_APPLICATION = JOB_APPLICATIONS + "/"; // PATCH + [id]
export const API_GET_APPLICATION_STATUS_COUNTS = JOB_APPLICATIONS + "/status-counts/"; // GET + [seekerId]