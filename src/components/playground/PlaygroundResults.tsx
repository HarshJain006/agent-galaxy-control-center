
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function PlaygroundResults() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🏆 Agent Results & Export</CardTitle>
        <CardDescription>
          View outputs from your agent chains and export results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Results Coming Soon!</h3>
          <p className="text-slate-600">Run some agents to see results here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
