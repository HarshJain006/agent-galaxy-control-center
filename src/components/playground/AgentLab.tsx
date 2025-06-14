
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabPDFChat } from "./lab/LabPDFChat";
import { LabRoleplay } from "./lab/LabRoleplay";
import { LabLifeFlow } from "./lab/LabLifeFlow";
import { LabToolCombo } from "./lab/LabToolCombo";

interface AgentLabProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  selectedCharacters: string[];
  setSelectedCharacters: (characters: string[]) => void;
  debateTopics: string;
  setDebateTopics: (topics: string) => void;
  lifeGoal: string;
  setLifeGoal: (goal: string) => void;
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  toast: (options: any) => void;
}

export function AgentLab(props: AgentLabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LabPDFChat
        uploadedFile={props.uploadedFile}
        setUploadedFile={props.setUploadedFile}
        chatMessage={props.chatMessage}
        setChatMessage={props.setChatMessage}
        toast={props.toast}
      />
      <LabRoleplay
        selectedCharacters={props.selectedCharacters}
        setSelectedCharacters={props.setSelectedCharacters}
        debateTopics={props.debateTopics}
        setDebateTopics={props.setDebateTopics}
        toast={props.toast}
      />
      <LabLifeFlow
        lifeGoal={props.lifeGoal}
        setLifeGoal={props.setLifeGoal}
        toast={props.toast}
      />
      <LabToolCombo
        selectedTools={props.selectedTools}
        setSelectedTools={props.setSelectedTools}
        toast={props.toast}
      />
    </div>
  );
}
