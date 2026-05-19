import {
  Award,
  CheckCircle2,
  Crown,
  Flame,
  Heart,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface AchievementMeta {
  id: keyof Messages["achievements"]["list"];
  icon: LucideIcon;
  color: string;
}

export const achievements: AchievementMeta[] = [
  { id: "first_goal", icon: Target, color: "#3b82f6" },
  { id: "first_deposit", icon: Heart, color: "#ec4899" },
  { id: "five_deposits", icon: TrendingUp, color: "#10b981" },
  { id: "twenty_deposits", icon: Star, color: "#f59e0b" },
  { id: "fifty_deposits", icon: Crown, color: "#a855f7" },
  { id: "streak_3", icon: Flame, color: "#f97316" },
  { id: "streak_7", icon: Flame, color: "#ef4444" },
  { id: "streak_30", icon: Zap, color: "#dc2626" },
  { id: "first_completion", icon: CheckCircle2, color: "#15803d" },
  { id: "five_completions", icon: Trophy, color: "#eab308" },
  { id: "multi_goals", icon: Award, color: "#06b6d4" },
  { id: "saver_1000", icon: Star, color: "#8b5cf6" },
];

export const currencies = [
  { code: "USD", flag: "🇺🇸" },
  { code: "MXN", flag: "🇲🇽" },
  { code: "GTQ", flag: "🇬🇹" },
  { code: "NIO", flag: "🇳🇮" },
  { code: "CRC", flag: "🇨🇷" },
  { code: "PAB", flag: "🇵🇦" },
  { code: "HNL", flag: "🇭🇳" },
  { code: "BRL", flag: "🇧🇷" },
  { code: "DOP", flag: "🇩🇴" },
  { code: "ARS", flag: "🇦🇷" },
  { code: "PYG", flag: "🇵🇾" },
  { code: "CLP", flag: "🇨🇱" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "VEF", flag: "🇻🇪" },
] as const;

// Allow safe key lookup for translations without importing the JSON type.
type Messages = {
  achievements: {
    list: {
      first_goal: string;
      first_deposit: string;
      five_deposits: string;
      twenty_deposits: string;
      fifty_deposits: string;
      streak_3: string;
      streak_7: string;
      streak_30: string;
      first_completion: string;
      five_completions: string;
      multi_goals: string;
      saver_1000: string;
    };
  };
};
