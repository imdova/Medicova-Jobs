"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import { CloudUpload, Close, Add, Delete } from "@mui/icons-material";
import { useLocationData } from "@/hooks/useLocationData";
import useFetch from "@/hooks/useFetch";
import { CareerLevels, JobCategory, SpecialtyItem } from "@/types";
import {
  API_GET_CAREER_LEVELS,
  API_GET_CATEGORIES,
  API_GET_SPECIALITIES,
} from "@/api/admin";
import { MaritalStatus } from "@/constants/enums/marital-status.enum";
import { Gender } from "@/constants/enums/gender.enum";

enum LanguageName {
  Arabic = "Arabic",
  English = "English",
  French = "French",
  German = "German",
}

enum LanguageProficiencyLevel {
  Native = "Native",
  Fluent = "Fluent",
  Intermediate = "Intermediate",
  Beginner = "Beginner",
}

type LanguageProficiency = {
  name: LanguageName;
  proficiency: LanguageProficiencyLevel;
};

interface EditSeekerModalProps {
  open: boolean;
  onClose: () => void;
  seekerData: UserProfile;
  onSave: (data: UserProfile) => Promise<void>;
}

const genders = ["MALE", "FEMALE", "OTHER"];
const socialPlatforms = [
  "website",
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
  "youtube",
  "tiktok",
  "snapchat",
  "pinterest",
  "reddit",
  "discord",
  "telegram",
  "whatsapp",
];

const EditSeekerModal = ({
  open,
  onClose,
  seekerData,
  onSave,
}: EditSeekerModalProps) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: {
      ...seekerData,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(seekerData.avatar);
  const [newLanguage, setNewLanguage] = useState<LanguageProficiency>({
    name: LanguageName.English,
    proficiency: LanguageProficiencyLevel.Fluent,
  });
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>(
    seekerData.socialLinks || {},
  );
  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    url: "",
  });

  const selectedCountry = watch("country");
  const { countries } = useLocationData();
  const countryCode = selectedCountry?.code;
  const { states } = useLocationData(countryCode || "");
  const { data: categories } =
    useFetch<PaginatedResponse<JobCategory>>(API_GET_CATEGORIES);
  const { data: specialities } =
    useFetch<PaginatedResponse<SpecialtyItem>>(API_GET_SPECIALITIES);
  const { data: careerLevels } = useFetch<PaginatedResponse<CareerLevels>>(
    API_GET_CAREER_LEVELS,
  );

  useEffect(() => {
    reset(seekerData);
    setAvatarPreview(seekerData.avatar);
    setSocialLinks(seekerData.socialLinks || {});
  }, [seekerData, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please select an image file (JPEG, PNG, GIF)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setValue("avatar", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddLanguage = () => {
    if (newLanguage.name) {
      const currentLanguages = watch("languages") || [];
      setValue("languages", [...currentLanguages, newLanguage]);
      setNewLanguage({
        name: LanguageName.English,
        proficiency: LanguageProficiencyLevel.Fluent,
      });
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const currentLanguages = [...(watch("languages") || [])];
    currentLanguages.splice(index, 1);
    setValue("languages", currentLanguages);
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setSocialLinks({
        ...socialLinks,
        [newSocialLink.platform]: newSocialLink.url,
      });
      setNewSocialLink({ platform: "", url: "" });
    }
  };

  const handleRemoveSocialLink = (platform: keyof SocialMediaLinks) => {
    const newLinks = { ...socialLinks };
    delete newLinks[platform];
    setSocialLinks(newLinks);
  };

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const finalData = {
        ...data,
        socialLinks,
      };
      await onSave(finalData);
      onClose();
    } catch (err) {
      setError("Failed to update seeker profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Seeker Profile</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" gap={4} mb={3}>
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar
                  src={avatarPreview || ""}
                  sx={{ width: 80, height: 80 }}
                  variant="rounded"
                />
                <Box>
                  <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUpload />}
                    >
                      Upload Photo
                    </Button>
                  </label>
                  <Typography variant="caption" display="block" mt={1}>
                    JPG, PNG or GIF. Max size 2MB
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  margin="normal"
                />
              </Box>

              <Controller
                name="birthDate"
                control={control}
                rules={{ required: "Birth date is required" }}
                render={({ field }) => (
                  <TextField
                    label="Birth Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.birthDate}
                    helperText={errors.birthDate?.message}
                    value={field.value ? field.value.split("T")[0] : ""}
                    onChange={(e) =>
                      field.onChange(new Date(e.target.value).toISOString())
                    }
                  />
                )}
              />
            </Box>
            <Box flex={1}>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.country}
                  >
                    <InputLabel>Country</InputLabel>
                    <Select
                      {...field}
                      label="Country"
                      onChange={(e) => {
                        const country = countries.find(
                          (c) => c.isoCode === e.target.value,
                        );
                        if (country) {
                          field.onChange({
                            code: country.isoCode,
                            name: country.name,
                          });
                          setValue("state", { code: "", name: "" });
                        }
                      }}
                      value={field.value?.code || ""}
                      renderValue={(selected) => {
                        if (!selected) return "";
                        const country = countries.find(
                          (c) => c.isoCode === selected,
                        );
                        return country?.name || selected;
                      }}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.country && (
                      <Typography variant="caption" color="error">
                        {errors.country.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal" error={!!errors.state}>
                    <InputLabel>State/Region</InputLabel>
                    <Select
                      {...field}
                      label="State/Region"
                      disabled={!countryCode}
                      onChange={(e) => {
                        const state = states.find(
                          (s) => s.isoCode === e.target.value,
                        );
                        if (state) {
                          field.onChange({
                            code: state.isoCode,
                            name: state.name,
                          });
                        }
                      }}
                      value={field.value?.code || ""}
                      renderValue={(selected) => {
                        if (!selected) return "";
                        const state = states.find(
                          (s) => s.isoCode === selected,
                        );
                        return state?.name || selected;
                      }}
                    >
                      {countryCode ? (
                        states.map((state) => (
                          <MenuItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>Select country first</MenuItem>
                      )}
                    </Select>
                    {errors.state && (
                      <Typography variant="caption" color="error">
                        {errors.state.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <TextField
                fullWidth
                label="City"
                {...register("city")}
                margin="normal"
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gender</InputLabel>
                    <Select {...field} label="Gender">
                      {Object.values(Gender).map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Marital Status</InputLabel>
                    <Select {...field} label="Marital Status">
                      {Object.values(MaritalStatus).map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box mb={3}>
            <Typography className="mb-4" variant="subtitle1" gutterBottom>
              Languages
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={newLanguage.name}
                  label="Language"
                  onChange={(e) =>
                    setNewLanguage({
                      ...newLanguage,
                      name: e.target.value as LanguageName,
                    })
                  }
                >
                  {Object.values(LanguageName).map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Proficiency</InputLabel>
                <Select
                  value={newLanguage.proficiency}
                  label="Proficiency"
                  onChange={(e) =>
                    setNewLanguage({
                      ...newLanguage,
                      proficiency: e.target.value as LanguageProficiencyLevel,
                    })
                  }
                >
                  {Object.values(LanguageProficiencyLevel).map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddLanguage}
              >
                Add
              </Button>
            </Box>
            <Box display="flex" gap={1} flexWrap="wrap">
              {(watch("languages") || []).map((lang, index) => (
                <Chip
                  key={index}
                  label={`${lang.name} (${lang.proficiency})`}
                  onDelete={() => handleRemoveLanguage(index)}
                />
              ))}
            </Box>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              Social Links
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={newSocialLink.platform}
                  label="Platform"
                  onChange={(e) =>
                    setNewSocialLink({
                      ...newSocialLink,
                      platform: e.target.value,
                    })
                  }
                >
                  {socialPlatforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="URL"
                value={newSocialLink.url}
                onChange={(e) =>
                  setNewSocialLink({
                    ...newSocialLink,
                    url: e.target.value,
                  })
                }
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddSocialLink}
              >
                Add
              </Button>
            </Box>
            <Box>
              {Object.entries(socialLinks).map(([platform, url]) => (
                <Box
                  key={platform}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={1}
                >
                  <Typography variant="body2">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}:{" "}
                    {url}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleRemoveSocialLink(platform as keyof SocialMediaLinks)
                    }
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          <Box mb={3}>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.categoryId}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    {...field}
                    label="Category"
                    renderValue={(selected) => {
                      const category = categories?.data.find(
                        (c) => c.id === selected,
                      );
                      return category?.name || selected;
                    }}
                  >
                    {categories?.data.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.categoryId && (
                    <Typography variant="caption" color="error">
                      {errors.categoryId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="specialityId"
              control={control}
              rules={{ required: "Speciality is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.specialityId}
                >
                  <InputLabel>Speciality</InputLabel>
                  <Select
                    {...field}
                    label="Speciality"
                    renderValue={(selected) => {
                      const speciality = specialities?.data.find(
                        (s) => s.id === selected,
                      );
                      return speciality?.name || selected;
                    }}
                  >
                    {specialities?.data.map((speciality) => (
                      <MenuItem key={speciality.id} value={speciality.id}>
                        {speciality.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.specialityId && (
                    <Typography variant="caption" color="error">
                      {errors.specialityId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="careerLevelId"
              control={control}
              rules={{ required: "Career level is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.careerLevelId}
                >
                  <InputLabel>Career Level</InputLabel>
                  <Select
                    {...field}
                    label="Career Level"
                    renderValue={(selected) => {
                      const level = careerLevels?.data.find(
                        (l) => l.id === selected,
                      );
                      return level?.name || selected;
                    }}
                  >
                    {careerLevels?.data.map((level) => (
                      <MenuItem key={level.id} value={level.id}>
                        {level.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.careerLevelId && (
                    <Typography variant="caption" color="error">
                      {errors.careerLevelId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Box>

          <TextField fullWidth label="About" {...register("about")} />

          <Box display="flex" gap={2} mt={3}>
            <FormControlLabel
              control={
                <Controller
                  name="hasDrivingLicence"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value || false} />
                  )}
                />
              }
              label="Has Driving Licence"
            />

            <FormControlLabel
              control={
                <Controller
                  name="isPublic"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
              label="Profile is Public"
            />

            <FormControlLabel
              control={
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
              label="Active"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSeekerModal;
