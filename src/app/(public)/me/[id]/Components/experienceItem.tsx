"use client";
import { Edit, LocationOnOutlined } from "@mui/icons-material";
import experiencesImage from "@/components/icons/briefcase.png";
import Image from "next/image";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import ExperienceModal from "./Modals/experience-modal";
import { formatLocation } from "@/util/general";
import { formatDate, getDuration } from "@/util";

const ExperienceItem: React.FC<{ item: ExperienceData; isMe: boolean }> = ({
  item,
  isMe,
}) => {
  const location = formatLocation(item);
  const duration = getDuration({
    startDate: item.startDate,
    endDate: item.isPresent ? undefined : item.endDate,
  });
  return (
    <div className="flex items-start gap-3 rounded-base border-gray-200 border p-2">
      <Image src={experiencesImage} alt="Experience" width={50} height={50} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h6 className="font-semibold leading-tight text-main">{item.name}</h6>
          {isMe && (
            <OpenModalButton
              ModalComponent={ExperienceModal}
              componentProps={{
                initialValues: item,
              }}
              size="small"
              // className="rounded border border-solid border-gray-200 p-2"
              title="Edit Experience"
            >
              <Edit className="w-5" />
            </OpenModalButton>
          )}
        </div>
        <p className="text-sm text-secondary">{item.title}</p>
        <p className="text-sm text-secondary">
          {formatDate(item.startDate, { year: true, month: true, day: false })}{" "}
          -{" "}
          {item.isPresent
            ? "Now"
            : formatDate(item.endDate, {
                year: true,
                month: true,
                day: false,
              })}{" "}
          ({duration})
        </p>
        <div className="flex text-sm text-secondary">
          <LocationOnOutlined className="-ml-1 text-base" />
          <p className="text-sm text-secondary">{location}</p>
        </div>
      </div>
    </div>
  );
};
export default ExperienceItem;
