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

const JobOverview: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <h4 className="text-main mb-4 text-lg font-semibold">Job Overview</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PersonOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Career Level </h5>
            <p className="text-secondary"> Consultant </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccessTimeOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Job Type </h5>
            <p className="text-secondary"> Full Time Onsite </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <WorkOutlineOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Category </h5>
            <p className="text-secondary"> Doctors </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StarsOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Experience </h5>
            <p className="text-secondary"> (3-5) Years </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SchoolOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Degree </h5>
            <p className="text-secondary"> Master’s Degree </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AccountBalanceWalletOutlined
            fontSize="medium"
            className="text-primary"
          />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Required Age </h5>
            <p className="text-secondary"> (45-50) Years </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PaidOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Offered Salary </h5>
            <p className="text-secondary"> $40000-$42000 </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FmdGoodOutlined fontSize="medium" className="text-primary" />
          <div className="flex flex-col">
            <h5 className="text-main font-semibold"> Location </h5>
            <p className="text-secondary"> Geddah, Saudi Arabia </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;
