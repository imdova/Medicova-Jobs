"use client";
import Image from "next/image";
import { Edit, LocationOnOutlined } from "@mui/icons-material";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import education from "@/components/icons/education.png";
import EducationModal from "./Modals/education-modal";
import { formatLocation } from "@/util/general";
import { educationOptions } from "@/constants/job";

const EducationItem: React.FC<{ item: EducationData; isMe: boolean }> = ({
  item,
  isMe,
}) => {
  const duration = item.endYear - item.startYear;
  const location = formatLocation(item);
  const degree =
    educationOptions.find((x) => x.id === item.degree)?.label || "";
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
          {degree} in {item.program} - {item.grade}
        </p>
        <p className="text-sm text-secondary">
          {item.startYear} -{item.endYear}{" "}
          {duration > 0 ? `(${duration} y)` : null}
        </p>
        <div className="flex text-sm text-secondary">
          <LocationOnOutlined className="-ml-1 text-base" />
          <p className="text-sm text-secondary">{location}</p>
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

export default EducationItem;
