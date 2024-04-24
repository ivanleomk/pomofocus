import PomodoroTimer from "@/components/timer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto max-w-md mt-20">
      <div>
        <h1>Focus</h1>
        <PomodoroTimer />
      </div>
    </div>
  );
}
