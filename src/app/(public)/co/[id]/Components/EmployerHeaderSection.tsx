import { Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PlaceIcon from "@mui/icons-material/Place";
import GroupsIcon from "@mui/icons-material/Groups";
import { Verified } from "@mui/icons-material";
import { Company } from "@/types";
import { companySizeList } from "@/constants";
import ProfileCoverSection from "./ProfileCoverSection";
import EditCompanySection from "./EditCompanySection";

interface EmployerHeaderSectionProps {
  isEmployee: boolean;
  company: Company;
}

const EmployerHeaderSection: React.FC<EmployerHeaderSectionProps> = ({
  company,
  isEmployee,
}) => {
  const size = companySizeList.find((item) => item.value === company.size);
  return (
    <div className="overflow-hidden rounded-base border border-gray-100 bg-white shadow-soft">
      {/* Background Cover Image */}
      <ProfileCoverSection company={company} isEmployee={isEmployee} />
      {/* Profile Section */}
      <div className="rounded-base p-4">
        <div className="flex">
          {/* Text Section */}
          <div className="flex-1">
            <div className="text-left">
              <h3 className="mb-2 text-2xl font-bold text-main">
                {company.name}
                <Verified className="ml-3 text-primary" />
              </h3>
              {company.title && (
                <Typography
                  variant="body1"
                  sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  {company.title}
                </Typography>
              )}
              <div className="mt-3 flex flex-wrap items-center justify-start">
                <div className="mr-3 flex items-center gap-1">
                  <LocalHospitalIcon className="text-primary" />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {company.companyTypeName}
                  </Typography>
                </div>
                {(company.country?.name ||
                  company.state?.name ||
                  company.city) && (
                  <div className="mr-3 flex items-center gap-1">
                    <PlaceIcon className="text-primary" />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {(company.country?.name || "") +
                        (company.state?.name ? `, ${company.state.name}` : "") +
                        (company.city ? `, ${company.city}` : "")}
                    </Typography>
                  </div>
                )}
                {size && (
                  <div className="mr-3 flex items-center gap-1">
                    <GroupsIcon className="text-primary" />
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {size?.name}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <EditCompanySection company={company} isEmployee={isEmployee} />
        </div>
      </div>
    </div>
  );
};

export default EmployerHeaderSection;
