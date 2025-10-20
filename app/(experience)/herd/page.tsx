import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { UserProvider } from "@/stores/user-store";

export default function HerdPage() {
  return (
    <div className="w-full h-full">
      <ResizablePanelGroup>
        <ResizablePanel index={0} defaultSize={450} minSize={350} maxSize={500}>
          <div className="absolute inset-0 bg-red-400"></div>
        </ResizablePanel>
        <ResizableHandle
        // withHandle
        />
        <ResizablePanel index={1} defaultSize={900} minSize={900}>
          <div className="absolute inset-0 bg-blue-400"></div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <UserProvider isLoggedIn />
    </div>
  );
}
