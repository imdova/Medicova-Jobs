"use client";
import Image from "next/image";
import { Edit } from "@mui/icons-material";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import education from "@/components/icons/education.png";
import { formatDate } from "@/util";
import ActivityModal from "./Modals/activity-modal";

const ActivityItem: React.FC<{ item: ActivityData; isMe: boolean }> = ({
  item,
  isMe,
}) => {
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
        <h6 className="text-lg font-semibold text-main">{item.title}</h6>
        <p className="text-sm text-secondary">{item.provider}</p>
        <p className="text-sm text-secondary">{formatDate(item.date)}</p>
      </div>

      {isMe && (
        <OpenModalButton
          ModalComponent={ActivityModal}
          componentProps={{
            initialValues: item,
          }}
          size="small"
          // className="rounded border border-solid border-gray-200 p-2"
          title="Edit Activity"
        >
          <Edit className="w-5" />
        </OpenModalButton>
      )}
    </div>
  );
};

export default ActivityItem;
