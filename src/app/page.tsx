import PomodoroLog from "@/components/PomodoroSessions";
import PomodoroTimer from "@/components/timer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-full w-4/5 max-w-6xl mx-auto">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex justify-center items-center h-full">
            <PomodoroTimer />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="mx-10">
          <PomodoroLog />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
