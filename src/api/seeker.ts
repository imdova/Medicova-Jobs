import { API_URL } from ".";

export const BASE = API_URL + "/api/v1.0.0/seeker";

// User Profiles
export const PROFILES = BASE + "/profile";
export const API_GET_SEEKER_BY_USERNAME = PROFILES + "/username/"; // GET + [username]
export const API_GET_SEEKER_BY_ID = PROFILES + "/"; // GET + [id]
export const API_GET_SEEKERS = PROFILES; // GET
export const API_UPDATE_SEEKER = PROFILES + "/"; // PATCH + [id]
export const API_DELETE_SEEKER = PROFILES + "/"; // DELETE + [id]
export const API_RECALCULATE_COMPLETENESS = PROFILES + "/{id}/completeness"; // GET + [id]

// User Skills
export const SKILLS = BASE + "/skills";
export const API_GET_SEEKER_SKILLS = SKILLS + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_SKILL_BY_ID = SKILLS + "/"; // GET + [id]
export const API_CREATE_SEEKER_SKILL = SKILLS; // POST
export const API_UPDATE_SEEKER_SKILL = SKILLS + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_SKILL = SKILLS + "/"; // DELETE + [id]
export const API_GET_ALL_SEEKER_SKILLS = SKILLS; // GET

// User Experience
export const EXPERIENCE = BASE + "/experience";
export const API_CREATE_SEEKER_EXPERIENCE = EXPERIENCE; // POST
export const API_UPDATE_SEEKER_EXPERIENCE = EXPERIENCE + "/"; // PATCH + [id]
export const API_GET_SEEKER_EXPERIENCE = EXPERIENCE + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_EXPERIENCE_BY_ID = EXPERIENCE + "/"; // GET + [id]
export const API_DELETE_SEEKER_EXPERIENCE = EXPERIENCE + "/"; // DELETE + [id]

// User Education
export const EDUCATION = BASE + "/education";
export const API_CREATE_SEEKER_EDUCATION = EDUCATION; // POST
export const API_UPDATE_SEEKER_EDUCATION = EDUCATION + "/"; // PATCH + [id]
export const API_GET_SEEKER_EDUCATION = EDUCATION + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_EDUCATION_BY_ID = EDUCATION + "/"; // GET + [id]
export const API_DELETE_SEEKER_EDUCATION = EDUCATION + "/"; // DELETE + [id]

// User Courses
export const COURSES = BASE + "/courses";
export const API_CREATE_SEEKER_COURSE = COURSES; // POST
export const API_UPDATE_SEEKER_COURSE = COURSES + "/"; // PATCH + [id]
export const API_GET_SEEKER_COURSES = COURSES + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_COURSE_BY_ID = COURSES + "/"; // GET + [id]
export const API_DELETE_SEEKER_COURSE = COURSES + "/"; // DELETE + [id]

// Career Preferences
export const PREFERENCES = BASE + "/career-preference";
export const API_CREATE_CAREER_PREFERENCE = PREFERENCES; // POST
export const API_UPDATE_CAREER_PREFERENCE = PREFERENCES + "/"; // PATCH + [id]
export const API_GET_CAREER_PREFERENCES = PREFERENCES + "/seeker/"; // GET + [seekerId]
export const API_GET_CAREER_PREFERENCE_BY_ID = PREFERENCES + "/"; // GET + [id]
export const API_DELETE_CAREER_PREFERENCE = PREFERENCES + "/"; // DELETE + [id]

// User Activities
export const ACTIVITIES = BASE + "/activities";
export const API_CREATE_SEEKER_ACTIVITY = ACTIVITIES; // POST
export const API_UPDATE_SEEKER_ACTIVITY = ACTIVITIES + "/"; // PATCH + [id]
export const API_GET_SEEKER_ACTIVITIES = ACTIVITIES + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_ACTIVITY_BY_ID = ACTIVITIES + "/"; // GET + [id]
export const API_DELETE_SEEKER_ACTIVITY = ACTIVITIES + "/"; // DELETE + [id]

// Folders
export const FOLDERS = BASE + "/folders";
export const API_CREATE_FOLDER = FOLDERS + "/create"; // POST
export const API_UPDATE_FOLDER = FOLDERS; // PATCH
export const API_SET_FOLDER_FAVORITES = FOLDERS + "/favorite-status"; // PUT
export const API_ADD_SEEKER_TO_FOLDER = FOLDERS + "/add-single-seeker"; // POST
export const API_ADD_SEEKERS_TO_FOLDER = FOLDERS + "/add-multiple-seekers"; // POST
export const API_GET_FOLDERS = FOLDERS + "/read-by-company?id="; // GET + [companyId]
export const API_GET_FOLDER_SEEKERS = FOLDERS + "/get-seekers-profiles"; // GET + [folderId]
export const API_GET_FOLDER_BY_ID = FOLDERS + "/"; // GET + [id]
export const API_DELETE_FOLDER_BY_ID = FOLDERS + "/"; // DELETE + [id]
export const API_GET_FOLDER_BY_SEEKER_AND_COMPANY =
  FOLDERS + "/{seekerId}/company/{companyId}"; // GET
