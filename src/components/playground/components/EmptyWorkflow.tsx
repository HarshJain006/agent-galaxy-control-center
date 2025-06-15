
import { Workflow } from "lucide-react";

export function EmptyWorkflow() {
  return (
    <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg">
      <Workflow className="w-8 h-8 text-slate-400 mx-auto mb-2" />
      <p className="text-slate-500">Add agents from the left to build your workflow</p>
    </div>
  );
}
