import Image from "next/image";
import { Add } from "@mui/icons-material";
import EmptyCard from "@/components/UI/emptyCard";
import OpenModalButton from "@/components/form/FormModal/buttons/openModalButton";
import { getExperience } from "@/lib/actions/users.actions";
import ClampedList from "@/components/UI/ClampedList";
import ExperienceModal from "./Modals/experience-modal";
import ExperienceItem from "./experienceItem";

const INITIAL_VISIBLE_ITEMS = 2;
const ExperienceSection = async ({
  user,
  isMe,
}: {
  user: UserProfile;
  isMe: boolean;
}) => {
  const result = await getExperience(user.id);
  if (!result.success || !result.data) {
    return (
      <EmptyCard
        src={"/images/activities.png"}
        description={"Your Experiences will appear here."}
        buttonText="Add Experience"
        onClick={open}
      />
    );
  }
  const experiences = result.data;
  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className=" mb-4 flex items-center justify-between">
        <h3 className=" text-xl font-semibold text-main">Experience</h3>
        {isMe && (
          <OpenModalButton
            componentProps={{
              seekerId: user.id,
              initialValues: {
                country: user.country || { code: "", name: "" },
                state: user.state || { code: "", name: "" },
                city: user.city || "",
              },
            }}
            ModalComponent={ExperienceModal}
            className="rounded border border-solid border-gray-300 p-2"
            title="Add Experience"
          >
            <Add />
          </OpenModalButton>
        )}
      </div>

      {experiences.length > 0 ? (
        <ClampedList
          className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2"
          Component={ExperienceItem}
          componentProps={{ isMe }}
          data={experiences}
          initialVisibleItems={INITIAL_VISIBLE_ITEMS}
        />
      ) : isMe ? (
        <div className="flex w-full flex-col items-center justify-center text-center">
          {/* Image */}
          <Image
            src={"/images/activities.png"}
            alt={"Add Experience"}
            width={180}
            height={180}
          />
          {/* Description */}
          <p className="mb-2 text-secondary">
            Your Experiences will appear here.
          </p>
          <OpenModalButton
            variant="contained"
            btnVariant="button"
            componentProps={{
              seekerId: user.id,
              initialValues: {
                country: user.country || { code: "", name: "" },
                state: user.state || { code: "", name: "" },
                city: user.city || "",
              },
            }}
            ModalComponent={ExperienceModal}
          >
            Add Experience
          </OpenModalButton>
        </div>
      ) : null}
    </div>
  );
};

export default ExperienceSection;
