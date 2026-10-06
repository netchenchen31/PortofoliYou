import {
  BriefcaseBusiness,
  Clapperboard,
  Film,
  Ellipsis,
  Eye,
  FileText,
  GraduationCap,
  PenTool,
  SquarePlay,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/types";
import type { PurposeId } from "@/lib/purposes";

// Icons used on the Home and "pick categories" screens
export const PURPOSE_ICONS: Record<PurposeId, LucideIcon> = {
  hiring: BriefcaseBusiness,
  collaborator: Users,
  academic: GraduationCap,
  explore: Eye,
};

export const CATEGORY_ICONS: Record<Category | "Other", LucideIcon> = {
  Film: Clapperboard,
  Animation: Film,
  Design: PenTool,
  "Content Creation": SquarePlay,
  Research: FileText,
  Other: Ellipsis,
};
