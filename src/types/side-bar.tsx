import { icons } from "@/constants/side-bar";

export interface LinkType {
  title?: string;
  url?: string;
  icon?: keyof typeof icons;
  links?: LinkType[];
  kind?: "divider" | "title" | "collapse";
}
