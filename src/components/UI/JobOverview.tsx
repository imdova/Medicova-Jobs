import { JobData } from "@/types";
import {
  AccessTimeOutlined,
  AccountBalanceWalletOutlined,
  FmdGoodOutlined,
  PaidOutlined,
  PersonOutlineOutlined,
  SchoolOutlined,
  StarsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const JobOverview: React.FC<{ className: string; data?: JobData }> = ({
  className,
  data,
}) => {
  return (
    <div className={className}>
      <h4 className="mb-4 text-lg font-semibold text-main">Job Overview</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PersonOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Career Level </h5>
            <p className="text-secondary"> {data?.jobCareerLevelId} </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccessTimeOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Job Type </h5>
            <p className="text-secondary">
              {" "}
              {data?.jobEmploymentTypeId} {data?.jobWorkPlace}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WorkOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Category </h5>
            <p className="text-secondary"> {data?.jobCategoryId} </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StarsOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Experience </h5>
            <p className="text-secondary">
              {" "}
              ({data?.minExpYears}-{data?.maxExpYears}) Years{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SchoolOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Degree </h5>
            <p className="text-secondary"> {data?.educationLevel} Degree </p>
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
              ({data?.minAge}-{data?.maxAge}) Years{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PaidOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Offered Salary </h5>
            <p className="text-secondary">
              {" "}
              ${data?.salaryRangeStart}-${data?.salaryRangeEnd}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FmdGoodOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="font-semibold text-main"> Location </h5>
            <p className="text-secondary"> {data?.country}, {data?.city} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;
