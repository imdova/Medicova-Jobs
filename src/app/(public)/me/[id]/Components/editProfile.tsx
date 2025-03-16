"use client";
import { TAGS } from "@/api";
import {
  API_GET_CAREER_LEVELS_BY_CATEGORY,
  API_GET_CATEGORIES,
  API_GET_INDUSTRIES,
  API_GET_SPECIALITIES_BY_CATEGORY,
} from "@/api/admin";
import FormModal from "@/components/form/FormModal/FormModal";
import ShareMenu from "@/components/UI/ShareMenu";
import useFetch from "@/hooks/useFetch";
import useUpdateApi from "@/hooks/useUpdateApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { FieldConfig, Industry } from "@/types";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface EditProfileProps {
  user: UserProfile;
  isMe: boolean;
}

const initialValues = (user: Partial<UserProfile>): Partial<UserProfile> => ({
  firstName: user?.firstName,
  lastName: user?.lastName,
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

  const { countries, states } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (countryCode) {
      dispatch(fetchStates(countryCode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  // categories and specialities

  const { data: categories } =
    useFetch<PaginatedResponse<Industry>>(API_GET_CATEGORIES);
  const [jobCareerLevels, setJobCareerLevels] = useState<Industry[]>([]);
  const [jobSpecialities, setJobSpecialities] = useState<Industry[]>([]);

  const handleCategorySelect = async (id: string) => {
    const specialtyResponse = await fetch(
      API_GET_SPECIALITIES_BY_CATEGORY + id,
    );
    const specialtyData =
      (await specialtyResponse.json()) as PaginatedResponse<Industry>;
    setJobSpecialities(specialtyData.data);

    const careerLevelResponse = await fetch(
      `${API_GET_CAREER_LEVELS_BY_CATEGORY}?ids=${id}`,
    );
    const careerLevelData =
      (await careerLevelResponse.json()) as PaginatedResponse<Industry>;
    setJobCareerLevels(careerLevelData.data);
  };

  // fields
  const handleUpdate = async (formData: Partial<UserProfile>) => {
    const {
      firstName,
      lastName,
      title,
      city,
      state: formState,
      country: formCountry,
    } = formData;
    const country =
      countries.data.find((country) => country.isoCode === formCountry?.code) ||
      null;
    const state =
      states.data.find((state) => state.isoCode === formState?.code) || null;
    const body: Partial<UserProfile> = {
      id: user?.id,
      country: country ? { code: country.isoCode, name: country.name } : null,
      state: state ? { code: state.isoCode, name: state.name } : null,
      firstName,
      lastName,
      title,
      city,
    };
    console.log("🚀 ~ handleUpdate ~ body:", body);
    // await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
  };

  const fields: FieldConfig<UserProfile>[] = [
    {
      label: "First Name*",
      name: "firstName",
      type: "text",
      gridProps: { xs: 6 },
    },
    {
      label: "Last Name*",
      name: "lastName",
      type: "text",
      gridProps: { xs: 6 },
    },
    {
      name: "birth",
      type: "date",
      label: "Date of Birth*",
      gridProps: { xs: 6 },
    },
    {
      label: "Nationality*",
      name: "nationality",
      type: "text",
      gridProps: { xs: 6 },
    },
    {
      name: "title",
      label: "Title*",
      type: "text",
    },
    {
      name: "categoryId",
      type: "select",
      required: true,
      label: "Category*",
      onChange: handleCategorySelect,
      options: categories?.data.map((type) => ({
        value: type.id,
        label: type.name,
      })),
    },
    {
      name: "specialityId",
      type: "select",
      dependsOn: "categoryId",
      required: true,
      label: "Specialty*",
      options: jobSpecialities.map((type) => ({
        value: type.id,
        label: type.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "careerLevelId",
      type: "select",
      dependsOn: "categoryId",
      required: true,
      label: "Career Level*",
      options: jobCareerLevels.map((type) => ({
        value: type.id,
        label: type.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "country.code",
      type: "search-select",
      label: "Country",
      resetFields: ["state.code"],
      textFieldProps: {
        placeholder: "Select country",
      },
      options: countries.data.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value) => setCountryCode(value),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "state.code",
      type: "search-select",
      label: "State",
      dependsOn: "country.code",
      textFieldProps: {
        placeholder: "Select state",
      },
      options: states.data.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 6, md: 4 },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      textFieldProps: {
        placeholder: "Enter City",
      },
      gridProps: { xs: 12, md: 4 },
      validation: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const open = () => setIsModalOpen(true);
  const onClose = () => {
    setIsModalOpen(false);
    reset();
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
          initialValues={initialValues(user)}
        />
      )}
      <div className="flex h-full flex-col items-center justify-center gap-2 sm:items-end">
        {/* Edit Button */}
        {isMe && (
          <IconButton onClick={open}>
            <Edit />
          </IconButton>
        )}
        {/* Share Button */}
        <ShareMenu path={`/me/${user.userName}`} />
      </div>
    </>
  );
};

export default EditProfile;
