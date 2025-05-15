"use client";
import { TAGS } from "@/api";
import {
  API_GET_CAREER_LEVELS_BY_CATEGORY,
  API_GET_CATEGORIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
} from "@/api/admin";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import FormModal from "@/components/form/FormModal/FormModal";
import ShareMenu from "@/components/UI/ShareMenu";
import { nationalitiesOptions } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { useLocationData } from "@/hooks/useLocationData";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig, Industry } from "@/types";
import { getExperienceDetail } from "@/util/general";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface EditProfileProps {
  user: UserProfile;
  isMe: boolean;
}

const initialValues = (user: Partial<UserProfile>): Partial<UserProfile> => ({
  firstName: user?.firstName,
  lastName: user?.lastName,
  birthDate: user?.birthDate,
  nationality: user?.nationality,
  title: user?.title,
  state: user?.state || null,
  country: user?.country || null,
  city: user?.city,
  categoryId: user?.categoryId,
  specialityId: user?.specialityId,
  careerLevelId: user?.careerLevelId,
});

const EditProfile: React.FC<EditProfileProps> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, update, reset } =
    useUpdateApi<UserProfile>(handleSuccess);

  // location selection
  const [countryCode, setCountryCode] = useState(user?.country?.code || "");
  const { countries, states } = useLocationData(countryCode);

  // categories and specialities
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const { data: categoriesData } = useFetch<PaginatedResponse<Industry>>(
    API_GET_CATEGORIES,
    {},
    (categories) =>
      setCategoryId(
        categories.data?.find((category) => category.id === user?.categoryId)
          ?.id || null,
      ),
  );
  const { data: specialitiesData } = useFetch<PaginatedResponse<Industry>>(
    categoryId ? API_GET_SPECIALITIES_BY_CATEGORY + categoryId : null,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );
  const { data: careerLevelData } = useFetch<PaginatedResponse<Industry>>(
    categoryId
      ? `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${categoryId}`
      : null,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );

  const categories = categoriesData?.data || [];
  const specialities = specialitiesData?.data || [];
  const careerLevels = careerLevelData?.data || [];

  // fields
  const handleUpdate = async (formData: Partial<UserProfile>) => {
    const { state: formState, country: formCountry } = formData;
    const country =
      countries.find((country) => country.isoCode === formCountry?.code) ||
      null;
    const state =
      states.find((state) => state.isoCode === formState?.code) || null;

    const body: Partial<UserProfile> = {
      id: user?.id,
      ...formData,
      country: country ? { code: country.isoCode, name: country.name } : null,
      state: state ? { code: state.isoCode, name: state.name } : null,
    };
    await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
  };

  const fields: FieldConfig<UserProfile>[] = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      gridProps: { xs: 6 },
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      gridProps: { xs: 6 },
      required: true,
    },
    {
      name: "birthDate",
      type: "date",
      gridProps: { xs: 6 },
      label: "Date of Birth",
      textFieldProps: {
        inputProps: {
          max: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0],
        },
      },
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "search-select",
      options: nationalitiesOptions,
      gridProps: { xs: 6 },
    },
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "categoryId",
      type: "select",
      label: "Category",
      required: true,
      resetFields: ["specialityId", "careerLevelId"],
      onChange: (value) => setCategoryId(value),
      options: categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    },
    {
      name: "specialityId",
      type: "select",
      dependsOn: "categoryId",
      label: "Specialty",
      required: true,
      options: specialities.map((speciality) => ({
        value: speciality.id,
        label: speciality.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "careerLevelId",
      type: "select",
      dependsOn: "categoryId",
      label: "Career Level",
      required: true,
      options: careerLevels.map((careerLevel) => ({
        value: careerLevel.id,
        label: careerLevel.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "country.code",
      type: "search-select",
      resetFields: ["state.code", "city"],
      label: "Country",
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) => setCountryCode(value),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      dependsOn: "country.code",
      label: "State",
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      gridProps: { xs: 12, md: 4 },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const open = () => {
    setIsModalOpen(true);
    setCategoryId(
      categories?.find((category) => category.id === user?.categoryId)?.id ||
        null,
    );
    setCountryCode(user?.country?.code || "");
  };
  const onClose = () => {
    setIsModalOpen(false);
    reset();
    setCategoryId(null);
    setCountryCode("");
  };

  async function handleSuccess(newProfile: UserProfile) {
    onClose();
    await updateSession({
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      email: newProfile.email,
    });
  }

  return (
    <>
      {isMe && (
        <FormModal
          open={isModalOpen}
          error={error?.message}
          loading={isLoading}
          onClose={onClose}
          onSubmit={handleUpdate}
          fields={fields}
          title="Personal Information"
          initialValues={initialValues({
            ...user,
            title: getExperienceDetail(user.title || ""),
          })}
        />
      )}
      <div className="flex h-full flex-col items-center justify-center gap-2 sm:items-end">
        {/* Edit Button */}
        {isMe && (
          <IconButton onClick={open}>
            <Edit className="text-white" />
          </IconButton>
        )}
        {/* Share Button */}
        <ShareMenu className="text-white" path={`/me/${user.userName}`} />
      </div>
    </>
  );
};

export default EditProfile;
