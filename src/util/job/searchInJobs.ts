import { JobData } from "@/types";

export function searchJobsByQuery(
  jobs: JobData[],
  query: string = ""
): JobData[] {
  return jobs.filter((job) => {
    // Query match: Title, Description, Keywords
    return query
      ? job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description?.toLowerCase().includes(query.toLowerCase())
      : true;
  });
}
