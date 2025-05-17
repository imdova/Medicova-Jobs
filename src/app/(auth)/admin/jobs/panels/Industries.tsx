import React, { useEffect, useState } from "react";
import IndustriesSidebar from "./IndustriesSidebar";
import CategoryManagement from "./CategoryManagement";
import { API_GET_INDUSTRIES } from "@/api/admin";
import { Button } from "@mui/material";
import { Save, Refresh } from "@mui/icons-material";

type DataType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
};

const Industries: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [checkedCategories, setCheckedCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [industriesData, setIndustriesData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [allCategoriesData, setAllCategoriesData] = useState<{
    [key: string]: DataType[];
  }>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [initialCheckedState, setInitialCheckedState] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First fetch industries
        const industriesRes = await fetch(API_GET_INDUSTRIES);
        if (!industriesRes.ok) throw new Error("Failed to fetch industries");

        const industriesJson = await industriesRes.json();
        if (!Array.isArray(industriesJson?.data)) {
          throw new Error("Invalid industries data format");
        }

        setIndustriesData(industriesJson.data);

        // Initialize selected industry with the first one if available
        if (industriesJson.data.length > 0) {
          setSelectedIndustry(industriesJson.data[0].id);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch categories when selected industry changes
  useEffect(() => {
    if (!selectedIndustry) return;

    const fetchCategories = async () => {
      try {
        const categoriesRes = await fetch(
          `${API_GET_INDUSTRIES}/${selectedIndustry}`,
        );

        if (!categoriesRes.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categoriesJson = await categoriesRes.json();

        setAllCategoriesData((prev) => ({
          ...prev,
          [selectedIndustry]: categoriesJson.data || [],
        }));
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError(err.message || "Failed to load categories");
      }
    };

    fetchCategories();
  }, [selectedIndustry]);

  // Load checked categories from localStorage on initial render
  useEffect(() => {
    const savedChecked = localStorage.getItem("checkedCategories");
    if (savedChecked) {
      try {
        const parsedData = JSON.parse(savedChecked);
        setCheckedCategories(parsedData);
        setInitialCheckedState(parsedData);
      } catch (err) {
        console.error("Error parsing checked categories", err);
      }
    }
  }, []);

  // Track changes to checked categories
  useEffect(() => {
    const hasChanges =
      JSON.stringify(checkedCategories) !== JSON.stringify(initialCheckedState);
    setHasChanges(hasChanges);
  }, [checkedCategories, initialCheckedState]);

  const handleSave = () => {
    try {
      localStorage.setItem(
        "checkedCategories",
        JSON.stringify(checkedCategories),
      );
      setInitialCheckedState(checkedCategories);
      setHasChanges(false);
      // Here you could also add API call to save to server if needed
      setError(null);
      // Show success message or toast
    } catch (err) {
      console.error("Failed to save changes", err);
      setError("Failed to save changes");
    }
  };

  const handleReset = () => {
    setCheckedCategories(initialCheckedState);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg font-medium">Loading data...</div>
      </div>
    );
  }

  if (industriesData.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg font-medium">No industries available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <IndustriesSidebar
        industriesData={industriesData}
        selected={selectedIndustry}
        onSelect={setSelectedIndustry}
        setIndustries={setIndustriesData}
        allCategoriesData={allCategoriesData}
        setAllCategories={setAllCategoriesData}
      />

      <div className="flex-1">
        <div className="mb-4 flex justify-end gap-2">
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </div>

        {selectedIndustry ? (
          <CategoryManagement
            industry={selectedIndustry}
            industriesData={industriesData}
            setIndustries={setIndustriesData}
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
            setAllCategories={setAllCategoriesData}
          />
        ) : (
          <div className="flex h-96 items-center justify-center">
            <div className="text-lg font-medium">Select an industry</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Industries;
