"use client";
import Image from "next/image";
import { Edit, LocationOnOutlined } from "@mui/icons-material";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import education from "@/components/icons/education.png";
import EducationModal from "./Modals/education-modal";

const EducationItem: React.FC<{ item: EducationData; isMe: boolean }> = ({
  item,
  isMe,
}) => {
  const duration = item.endYear - item.startYear;
  return (
    <div className="flex items-start gap-3 rounded-base border p-2">
      <Image
        src={education}
        alt="Experience"
        width={70}
        height={70}
        className=""
      />
      <div className="flex-1">
        <h6 className="text-lg font-semibold text-main">{item.inistitute}</h6>
        <p className="text-sm text-secondary">
          {item.degree} - {item.grade}
        </p>
        <p className="text-sm text-secondary">
          {item.startYear} -{item.endYear} ({duration} y)
        </p>
        <div className="flex text-sm text-secondary">
          <LocationOnOutlined className="-ml-1 text-base" />
          <p className="text-sm text-secondary">{item.countryCode}</p>
        </div>
      </div>
      {isMe && (
        <OpenModalButton
          ModalComponent={EducationModal}
          componentProps={{
            initialValues: item,
          }}
          size="small"
          // className="rounded border border-solid border-gray-200 p-2"
          title="Edit Education"
        >
          <Edit className="w-5" />
        </OpenModalButton>
      )}
    </div>
  );
};


export default EducationItem