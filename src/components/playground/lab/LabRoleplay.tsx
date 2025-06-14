
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Play } from "lucide-react";
import { characters } from "../data/characters";

interface LabRoleplayProps {
  selectedCharacters: string[];
  setSelectedCharacters: (characters: string[]) => void;
  debateTopics: string;
  setDebateTopics: (topics: string) => void;
  toast: (options: any) => void;
}

export function LabRoleplay({ selectedCharacters, setSelectedCharacters, debateTopics, setDebateTopics, toast }: LabRoleplayProps) {
  const handleCharacterSelect = (charId: string) => {
    if (selectedCharacters.includes(charId)) {
      setSelectedCharacters(selectedCharacters.filter(id => id !== charId));
    } else if (selectedCharacters.length < 3) {
      setSelectedCharacters([...selectedCharacters, charId]);
    }
  };

  const startDebate = () => {
    if (selectedCharacters.length < 2 || !debateTopics) {
      toast({
        title: "Setup Required",
        description: "Select 2+ characters and enter a debate topic",
        variant: "destructive"
      });
      return;
    }

    const participants = selectedCharacters.map(id => 
      characters.find(c => c.id === id)?.name
    ).join(" vs ");

    toast({
      title: "🎭 Debate Starting!",
      description: `${participants} debating: ${debateTopics}`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-600" />
          🎭 Roleplay Arena
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Characters (up to 3)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {characters.map((char) => (
              <Button
                key={char.id}
                variant={selectedCharacters.includes(char.id) ? "default" : "outline"}
                onClick={() => handleCharacterSelect(char.id)}
                className="text-sm"
              >
                {char.emoji} {char.name}
              </Button>
            ))}
          </div>
        </div>
        <Input
          placeholder="Debate topic: AI ethics, Space exploration, etc."
          value={debateTopics}
          onChange={(e) => setDebateTopics(e.target.value)}
        />
        <Button onClick={startDebate} className="w-full">
          <Play className="w-4 h-4 mr-2" />
          Start Debate
        </Button>
      </CardContent>
    </Card>
  );
}
