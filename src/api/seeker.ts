import { API_URL } from ".";

export const API_SEEKER_BASE = API_URL + "/api/v1.0.0/seeker";

// User Profiles
export const SEEKER_PROFILES = API_SEEKER_BASE + "/profile";
export const API_GET_SEEKER_BY_USERNAME = SEEKER_PROFILES + "/username/"; // GET + [username]
export const API_GET_SEEKER_BY_ID = SEEKER_PROFILES + "/"; // GET + [id]
export const API_GET_SEEKERS = SEEKER_PROFILES; // GET
export const API_UPDATE_SEEKER = SEEKER_PROFILES + "/"; // PATCH + [id]
export const API_DELETE_SEEKER = SEEKER_PROFILES + "/"; // DELETE + [id]
export const API_RECALCULATE_COMPLETENESS = SEEKER_PROFILES + "/{id}/completeness"; // GET + [id]

// User Skills
export const SEEKER_SKILLS = API_SEEKER_BASE + "/skills";
export const API_GET_SEEKER_SKILLS = SEEKER_SKILLS + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_SKILL_BY_ID = SEEKER_SKILLS + "/"; // GET + [id]
export const API_CREATE_SEEKER_SKILL = SEEKER_SKILLS; // POST
export const API_UPDATE_SEEKER_SKILL = SEEKER_SKILLS + "/"; // PATCH + [id]
export const API_DELETE_SEEKER_SKILL = SEEKER_SKILLS + "/"; // DELETE + [id]
export const API_GET_ALL_SEEKER_SKILLS = SEEKER_SKILLS; // GET

// User Experience
export const SEEKER_EXPERIENCE = API_SEEKER_BASE + "/experience";
export const API_CREATE_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE; // POST
export const API_UPDATE_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE + "/"; // PATCH + [id]
export const API_GET_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_EXPERIENCE_BY_ID = SEEKER_EXPERIENCE + "/"; // GET + [id]
export const API_DELETE_SEEKER_EXPERIENCE = SEEKER_EXPERIENCE + "/"; // DELETE + [id]

// User Education
export const SEEKER_EDUCATION = API_SEEKER_BASE + "/education";
export const API_CREATE_SEEKER_EDUCATION = SEEKER_EDUCATION; // POST
export const API_UPDATE_SEEKER_EDUCATION = SEEKER_EDUCATION + "/"; // PATCH + [id]
export const API_GET_SEEKER_EDUCATION = SEEKER_EDUCATION + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_EDUCATION_BY_ID = SEEKER_EDUCATION + "/"; // GET + [id]
export const API_DELETE_SEEKER_EDUCATION = SEEKER_EDUCATION + "/"; // DELETE + [id]

// User Courses
export const SEEKER_COURSES = API_SEEKER_BASE + "/courses";
export const API_CREATE_SEEKER_COURSE = SEEKER_COURSES; // POST
export const API_UPDATE_SEEKER_COURSE = SEEKER_COURSES + "/"; // PATCH + [id]
export const API_GET_SEEKER_COURSES = SEEKER_COURSES + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_COURSE_BY_ID = SEEKER_COURSES + "/"; // GET + [id]
export const API_DELETE_SEEKER_COURSE = SEEKER_COURSES + "/"; // DELETE + [id]

// Career Preferences
export const CAREER_PREFERENCES = API_SEEKER_BASE + "/career-preference";
export const API_CREATE_CAREER_PREFERENCE = CAREER_PREFERENCES; // POST
export const API_UPDATE_CAREER_PREFERENCE = CAREER_PREFERENCES + "/"; // PATCH + [id]
export const API_GET_CAREER_PREFERENCES = CAREER_PREFERENCES + "/seeker/"; // GET + [seekerId]
export const API_GET_CAREER_PREFERENCE_BY_ID = CAREER_PREFERENCES + "/"; // GET + [id]
export const API_DELETE_CAREER_PREFERENCE = CAREER_PREFERENCES + "/"; // DELETE + [id]

// User Activities
export const SEEKER_ACTIVITIES = API_SEEKER_BASE + "/activities";
export const API_CREATE_SEEKER_ACTIVITY = SEEKER_ACTIVITIES; // POST
export const API_UPDATE_SEEKER_ACTIVITY = SEEKER_ACTIVITIES + "/"; // PATCH + [id]
export const API_GET_SEEKER_ACTIVITIES = SEEKER_ACTIVITIES + "/seeker/"; // GET + [seekerId]
export const API_GET_SEEKER_ACTIVITY_BY_ID = SEEKER_ACTIVITIES + "/"; // GET + [id]
export const API_DELETE_SEEKER_ACTIVITY = SEEKER_ACTIVITIES + "/"; // DELETE + [id]
