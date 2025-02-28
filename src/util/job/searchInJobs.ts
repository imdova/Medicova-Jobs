import { JobData } from "@/types";

export function searchJobsByQueryAndDate(
  jobs: JobData[],
  query: string = "",
  startDate: string | null = null,
  endDate: string | null = null,
): JobData[] {
  const now = new Date();

  return jobs.filter((job) => {
    // Query match: Title, Description, Keywords
    const queryMatch = query
      ? job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description?.toLowerCase().includes(query.toLowerCase())
      : true;

    // Date filter match: Start and End date range
    const validToDate = job.validTo ? new Date(job.validTo) : null;

    let dateMatch = true;

    if (startDate && endDate) {
      // Filter based on start and end date range
      const start = new Date(startDate);
      const end = new Date(endDate);
      dateMatch = validToDate
        ? validToDate >= start && validToDate <= end
        : false;
    } else if (startDate && !endDate) {
      // Filter from start date to now
      const start = new Date(startDate);
      dateMatch = validToDate
        ? validToDate >= start && validToDate <= now
        : false;
    } else if (!startDate && endDate) {
      // Filter for all jobs before end date
      const end = new Date(endDate);
      dateMatch = validToDate ? validToDate <= end : false;
    }

    // Return job if it matches both query and date conditions
    return queryMatch && dateMatch;
  });
}
