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
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import { CompanyType } from "@/types/employer";
import { useLocationData } from "@/hooks/useLocationData";
import { API_GET_COMPANY_SECTORS, API_GET_COMPANY_TYPES } from "@/api/admin";
import { Sector } from "@/types";
import useFetch from "@/hooks/useFetch";

interface Country {
  name: string;
  code: string;
}

interface State {
  name: string;
  code: string;
}

interface SocialLinks {
  [key: string]: string;
}

interface CompanyData {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
  title: string;
  username: string;
  isPrivate: boolean;
  isProfitable: boolean;
  status: "active" | "inactive" | "suspended";
  country: Country;
  state: State;
  city: string;
  size: "micro" | "small" | "medium" | "large" | "enterprise";
  phone: string;
  email: string;
  yearFounded: number;
  banner1: string;
  banner2: string;
  banner3: string;
  about: string;
  avatar: string;
  cover: string;
  socialLinks: SocialLinks;
  completencePercent: number;
  visible: boolean;
  profileUrl: string;
  companyTypeId: string;
  companySectorId: string;
  companyTypeName: string;
  companySectorName: string;
}

interface EditCompanyModalProps {
  open: boolean;
  onClose: () => void;
  companyData: CompanyType;
  onSave: (data: CompanyType) => Promise<void>;
}

const EditCompanyModal = ({
  open,
  onClose,
  companyData,
  onSave,
}: EditCompanyModalProps) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyType>({
    defaultValues: companyData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(companyData.avatar);
  const selectedCountry = watch("country.code");
  const { countries } = useLocationData();
  const { states } = useLocationData(selectedCountry || "");
  const { data: sectors } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_SECTORS,
  );
  const { data: types } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_TYPES,
  );

  useEffect(() => {
    reset(companyData);
    setAvatarPreview(companyData.avatar);
  }, [companyData, reset]);

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

  const onSubmit: SubmitHandler<CompanyType> = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      await onSave(data);
      onClose();
    } catch (err) {
      setError("Failed to update company. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Company</Typography>
          <Button onClick={onClose} color="inherit">
            <Close />
          </Button>
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
                  src={avatarPreview}
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
                      Upload Logo
                    </Button>
                  </label>
                  <Typography variant="caption" display="block" mt={1}>
                    JPG, PNG or GIF. Max size 2MB
                  </Typography>
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Company Name"
                {...register("name", { required: "Company name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Title"
                {...register("title")}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Phone"
                {...register("phone", {
                  required: "Phone is required",
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Year Founded"
                type="number"
                {...register("yearFounded", {
                  min: { value: 1800, message: "Invalid year" },
                  max: {
                    value: new Date().getFullYear(),
                    message: "Year cannot be in the future",
                  },
                })}
                error={!!errors.yearFounded}
                helperText={errors.yearFounded?.message}
                margin="normal"
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
                          field.onChange(country);
                          setValue("state", { code: "", name: "" });
                        }
                      }}
                      value={field.value?.code || ""}
                      renderValue={(selected) => {
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
                      disabled={!selectedCountry}
                      onChange={(e) => {
                        const state = states.find(
                          (s) => s.isoCode === e.target.value,
                        );
                        if (state) {
                          field.onChange(state);
                        }
                      }}
                      value={field.value?.code || ""}
                      renderValue={(selected) => {
                        const state = states.find(
                          (s) => s.isoCode === selected,
                        );
                        return state?.name || selected;
                      }}
                    >
                      {selectedCountry ? (
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
                name="size"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Company Size</InputLabel>
                    <Select {...field} label="Company Size">
                      <MenuItem value="micro">Micro (1-10 employees)</MenuItem>
                      <MenuItem value="small">Small (11-50 employees)</MenuItem>
                      <MenuItem value="medium">
                        Medium (51-200 employees)
                      </MenuItem>
                      <MenuItem value="large">
                        Large (201-500 employees)
                      </MenuItem>
                      <MenuItem value="enterprise">
                        Enterprise (500+ employees)
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box mb={3}>
            <Controller
              name="companySectorId"
              control={control}
              rules={{ required: "Sector is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.companySectorId}
                >
                  <InputLabel>Company Sector</InputLabel>
                  <Select
                    {...field}
                    label="Company Sector"
                    onChange={(e) => {
                      const sector = sectors?.data.find(
                        (s) => s.id === e.target.value,
                      );
                      if (sector) {
                        field.onChange(sector.id);
                        setValue("companySectorName", sector.name);
                      }
                    }}
                    renderValue={(selected) => {
                      const sector = sectors?.data.find(
                        (s) => s.id === selected,
                      );
                      return sector?.name || selected;
                    }}
                  >
                    {sectors?.data.map((sector) => (
                      <MenuItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.companySectorId && (
                    <Typography variant="caption" color="error">
                      {errors.companySectorId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="companyTypeId"
              control={control}
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.companyTypeId}
                >
                  <InputLabel>Company Type</InputLabel>
                  <Select
                    {...field}
                    label="Company Type"
                    onChange={(e) => {
                      const type = types?.data.find(
                        (t) => t.id === e.target.value,
                      );
                      if (type) {
                        field.onChange(type.id);
                        setValue("companyTypeName", type.name);
                      }
                    }}
                    renderValue={(selected) => {
                      const type = types?.data.find((t) => t.id === selected);
                      return type?.name || selected;
                    }}
                  >
                    {types?.data.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.companyTypeId && (
                    <Typography variant="caption" color="error">
                      {errors.companyTypeId.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Box>

          <TextField fullWidth label="About Company" {...register("about")} />
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

export default EditCompanyModal;
