
import { 
  Brain, 
  FileText, 
  Users, 
  Beaker, 
  Video, 
  GraduationCap, 
  MessageSquare, 
  Calendar, 
  Camera, 
  Settings
} from "lucide-react";
import { Agent } from "../types";

export const agents: Agent[] = [
  {
    id: "dreamchain",
    name: "DreamChain Builder",
    icon: Brain,
    description: "Multi-Agent Flow Builder - Type a goal, get a complete execution plan",
    category: "automation",
    status: "active"
  },
  {
    id: "pdf-chat",
    name: "Talk to My PDF",
    icon: FileText,
    description: "Upload PDF, chat with it like a person with memory & context",
    category: "document",
    status: "active"
  },
  {
    id: "roleplay-arena",
    name: "Roleplay Arena",
    icon: Users,
    description: "Conversational characters with memory - Einstein, Elon, Sherlock",
    category: "entertainment",
    status: "active"
  },
  {
    id: "ai-lab",
    name: "AI Lab Generator",
    icon: Beaker,
    description: "Mix tools like potions - drag & drop agents for new combinations",
    category: "creative",
    status: "active"
  },
  {
    id: "reels-generator",
    name: "Reels-from-Text",
    icon: Video,
    description: "Text → Script + AI Audio + Background + Captions for social media",
    category: "content",
    status: "active"
  },
  {
    id: "study-coach",
    name: "Study Coach AI",
    icon: GraduationCap,
    description: "Flashcards, quizzes, progress tracking, motivational coaching",
    category: "education",
    status: "active"
  },
  {
    id: "debate-club",
    name: "Debate Club AI",
    icon: MessageSquare,
    description: "Watch AI personas debate any topic - Musk vs Gandhi style",
    category: "entertainment",
    status: "active"
  },
  {
    id: "lifeflow",
    name: "LifeFlow Designer",
    icon: Calendar,
    description: "Long-term goal planning with checklists, deadlines & reminders",
    category: "productivity",
    status: "active"
  },
  {
    id: "face-agent",
    name: "AI Face Agent",
    icon: Camera,
    description: "Upload face image, create custom bot persona with voice & text",
    category: "creative",
    status: "active"
  },
  {
    id: "tool-combo",
    name: "Tool Combo Agent",
    icon: Settings,
    description: "Combine APIs to create instant productivity tools",
    category: "automation",
    status: "active"
  }
];
