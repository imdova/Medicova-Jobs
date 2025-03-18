"use client";
import { Edit, LocationOnOutlined } from "@mui/icons-material";
import experiencesImage from "@/components/icons/briefcase.png";
import Image from "next/image";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import ExperienceModal from "./Modals/experience-modal";
import { formatLocation } from "@/util/general";

const ExperienceItem: React.FC<{ item: ExperienceData; isMe: boolean }> = ({
  item,
  isMe,
}) => {
  const location = formatLocation(item);
  const duration = getDuration(item);
  return (
    <div className="flex items-start gap-3 rounded-base border p-2">
      <Image src={experiencesImage} alt="Experience" width={50} height={50} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold text-main">{item.name}</h6>
          {isMe && (
            <OpenModalButton
              ModalComponent={ExperienceModal}
              componentProps={{
                initialValues: item,
              }}
              // className="rounded border border-solid border-gray-300 p-2"
              title="Edit Experience"
            >
              <Edit />
            </OpenModalButton>
          )}
        </div>
        <p className="text-sm text-secondary">
          {item.title} ({duration})
        </p>
        <p className="text-sm text-secondary">{item.startDate} - {item.endDate}</p>
        <div className="flex text-sm text-secondary">
          <LocationOnOutlined className="-ml-1 text-base" />
          <p className="text-sm text-secondary">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;

const getDuration = ({
  startDate,
  endDate,
}: Partial<ExperienceData>): string => {
  if (!startDate) return "";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const durationInMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    end.getMonth() -
    start.getMonth();
  const years = Math.floor(durationInMonths / 12);
  const months = durationInMonths % 12;
  if (years === 0) {
    return `${months} month`;
  }
  return `${years} y ${months} m`;
};
