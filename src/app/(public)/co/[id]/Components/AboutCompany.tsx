import { IconButton } from "@mui/material";
import { Edit, PendingActions } from "@mui/icons-material";
import ClampedText from "@/components/UI/ClampedText";
import EmptyCard from "@/components/UI/emptyCard";
import Link from "next/link";

const AboutCompany: React.FC<{
  data?: string;
  isEmployee: boolean;
}> = ({ data, isEmployee }) => {
  if (!isEmployee && data?.length === 0) {
    return null;
  }
  return (
    <div className="relative mt-5 rounded-base border border-gray-100 bg-white p-4 shadow-lg md:p-5">
      {/* Title */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-main">About Company :</h3>
        {isEmployee && (
          <IconButton LinkComponent={Link} href="/employer/company-info" className="rounded border border-solid border-gray-300 p-2">
            <Edit />
          </IconButton>
        )}
      </div>
      {data ? (
        <ClampedText className="px-2 text-secondary" lines={3}>
          <PendingActions className="-ml-1 mr-2 inline text-primary" />
          {data}
        </ClampedText>
      ) : isEmployee ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={" Tell us about your company."}
          buttonText="Add About Company"
          onClick={() => {}}
        />
      ) : null}
    </div>
  );
};

export default AboutCompany;
