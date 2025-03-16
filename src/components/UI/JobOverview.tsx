import { Gender } from "@/constants/enums/gender.enum";
import {
  educationOptions,
  genderOptions,
  jobWorkPlaceOptions,
} from "@/constants/job";
import { JobData } from "@/types";
import {
  AccessTimeOutlined,
  AccountBalanceWalletOutlined,
  FemaleOutlined,
  FmdGoodOutlined,
  MaleOutlined,
  PaidOutlined,
  PersonOutlineOutlined,
  SchoolOutlined,
  StarsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const JobOverview: React.FC<{ className: string; data: JobData }> = ({
  className,
  data,
}) => {
  const workPlace =
    jobWorkPlaceOptions.find((x) => x.id === data.jobWorkPlace)?.label || "";
  const gender = genderOptions.find((x) => x.id === data.gender)?.label || "";
  const education =
    educationOptions.find((x) => x.id === data.educationLevel)?.label || "";
  return (
    <div className={className}>
      <h4 className="mb-4 text-lg font-semibold text-main">Job Overview</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PersonOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Career Level </h5>
            <p className="text-secondary"> {data.jobCareerLevel} </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccessTimeOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Job Type </h5>
            <p className="text-secondary">
              {data.jobEmploymentType ? data.jobEmploymentType : ""}{" "}
              {workPlace ? `| ${workPlace}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WorkOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Category </h5>
            <p className="text-secondary"> {data.jobCategory} </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StarsOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Experience </h5>
            <p className="text-secondary">
              {data.minExpYears === 0 && data.maxExpYears
                ? `(0 - ${data.maxExpYears}) years`
                : data.minExpYears && data.maxExpYears
                  ? `(${data.minExpYears} - ${data.maxExpYears}) years`
                  : data.minExpYears
                    ? `(${data.minExpYears}+) years`
                    : data.maxExpYears
                      ? `(${data.maxExpYears}-) years`
                      : null}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {data.gender === Gender.MALE ? (
            <MaleOutlined fontSize="medium" className="text-primary" />
          ) : (
            <FemaleOutlined fontSize="medium" className="text-primary" />
          )}
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Gender </h5>
            <p className="text-secondary"> {gender} </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SchoolOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Degree </h5>
            <p className="text-secondary"> {education} Degree </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccountBalanceWalletOutlined
            fontSize="medium"
            className="text-primary"
          />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Required Age </h5>
            <p className="text-secondary">
              {" "}
              ({data.minAge}-{data.maxAge}) Years{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PaidOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Offered Salary </h5>
            <p className="text-secondary">
              {" "}
              ${data.salaryRangeStart}-${data.salaryRangeEnd}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FmdGoodOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Location </h5>
            <p className="text-secondary">
              {" "}
              {data.country?.name ? `${data.country.name}, ` : ""}
              {data.city}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;
