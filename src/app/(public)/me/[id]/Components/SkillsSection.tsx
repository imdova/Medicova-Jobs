"use client";
import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "@/hooks/useFetch";
import {
  API_CREATE_SEEKER_SKILL,
  API_DELETE_SEEKER_SKILL,
  API_GET_SEEKER_SKILLS,
} from "@/api/seeker";
import useUpdateApi from "@/hooks/useUpdateApi";

let timer: NodeJS.Timeout;
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const SkillsSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => {
  const { data: initialSkills, refetch } = useFetch<SkillData[]>(
    API_GET_SEEKER_SKILLS + user.id,
    {},
    init,
  );
  const { update } = useUpdateApi<SkillData>(refetch);

  const [skills, setSkills] = useState<SkillData[]>(initialSkills || []);
  const [value, setValue] = useState("");

  const addSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() && skills.length < 12) {
      const isDuplicated = skills.find((skill) => skill.name === value);
      if (isDuplicated) {
        return shake(isDuplicated.name);
      }
      const skill = { name: value } as SkillData;
      setSkills((prevKeywords) => [...prevKeywords, skill]);
      setValue(""); // Reset the input field after adding
      const body = { seekerId: user.id, name: value };
      await update(API_CREATE_SEEKER_SKILL, { method: "POST", body });
    }
  };

  const debouncedInit = debounce((data?: SkillData[]) => {
    if (data) {
      setSkills(data);
    }
  }, 1000);

  function init(data?: SkillData[]) {
    debouncedInit(data);
  }

  const onDelete = async (id: string) => {
    setSkills((prevKeywords) => prevKeywords.filter((x) => x.id !== id));
    await update(API_DELETE_SEEKER_SKILL + id, { method: "DELETE" });
  };

  const [isShake, setIsShake] = useState<string | null>(null);

  function shake(name: string) {
    setIsShake(name);
    setTimeout(() => {
      setIsShake(null);
    }, 500);
  }

  if (!isMe && skills.length === 0) {
    return null;
  }
  return (
    <div className="mt-5 rounded-base border border-gray-200 bg-white p-3 shadow-soft md:p-5">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h3 className="text-xl font-semibold text-main">Skills</h3>

        {/* TextField and Add Skill Button in the same row */}
        {isMe && (
          <form onSubmit={addSkill}>
            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="m-0 rounded"
              variant="outlined"
              placeholder={
                skills.length >= 12 ? "Maximum Entry 12 skill" : "Enter Skills"
              }
              disabled={skills.length >= 12} // Disable if 12 skills are reached
              InputProps={{
                className: "p-0 rounded",
                endAdornment: (
                  <IconButton
                    className="flex h-full w-[42px] items-center justify-center rounded"
                    type="submit"
                    disabled={skills.length >= 12}
                  >
                    <AddIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        )}
      </div>

      {/* Display Keywords */}
      <div className="mt-2 flex flex-wrap">
        {skills.map((item) => (
          <div
            key={item.id + item.name}
            className={`${isShake === item.name ? "animate-shake border-red-400" : "border-gray-200"} mb-2 mr-2 rounded-full border bg-primary-100 px-2 py-2 pl-4 text-main`}
          >
            <span>{item.name}</span>
            {isMe && (
              <IconButton
                size="small"
                className="ml-2 border border-solid border-gray-200 bg-white"
                disabled={!item.id}
                onClick={() => onDelete(item.id)}
              >
                <CloseIcon className="h-4 w-4" />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
