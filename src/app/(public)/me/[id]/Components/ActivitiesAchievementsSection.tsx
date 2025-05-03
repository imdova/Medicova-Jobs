import Image from "next/image";
import { Add } from "@mui/icons-material";
import { getActivity } from "@/lib/actions/users.actions";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import ClampedList from "@/components/UI/ClampedList";
import ActivityModal from "./Modals/activity-modal";
import ActivityItem from "./ActivityItem";

interface ActivitySectionProps {
  user: UserProfile;
  isMe: boolean;
}
const INITIAL_VISIBLE_ITEMS = 2;

const ActivitySection = async ({ user, isMe }: ActivitySectionProps) => {
  const result = await getActivity(user.id);

  if (!(result.success && result.data && result.data.length > 0)) {
    if (!isMe) return null;
  }
  const activities = result.data || [];

  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-main">Activity</h3>
        {isMe && (
          <OpenModalButton
            componentProps={{
              seekerId: user.id,
            }}
            ModalComponent={ActivityModal}
            className="rounded border border-solid border-gray-200 p-2"
            title="Add Activity"
          >
            <Add />
          </OpenModalButton>
        )}
      </div>
      {activities.length > 0 ? (
        <ClampedList
          className="mt-2 grid grid-cols-1 gap-2"
          Component={ActivityItem}
          componentProps={{ isMe }}
          data={activities}
          type="Activity"
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />
      ) : isMe ? (
        <ActivityEmptyCard user={user} isMe={isMe} />
      ) : null}
    </div>
  );
};

export default ActivitySection;

const ActivityEmptyCard: React.FC<ActivitySectionProps> = ({ user }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {/* Image */}
      <Image
        src={"/images/activities.png"}
        alt={"Add Activity"}
        width={180}
        height={180}
      />
      {/* Description */}
      <p className="mb-2 text-secondary">Your Activity will appear here.</p>
      <OpenModalButton
        variant="contained"
        btnVariant="button"
        componentProps={{
          seekerId: user.id,
        }}
        ModalComponent={ActivityModal}
      >
        Add Activity
      </OpenModalButton>
    </div>
  );
};
