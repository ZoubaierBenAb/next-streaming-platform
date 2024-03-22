import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface VolumeControlProps {
  onChange: () => void;
  onToggle: () => void;
  value: number;
}

export const VolumeControl = ({ onChange, onToggle, value }) => {
  const volumeIsMute = value === 0;
  const volumeIsAboveHalf = (value = 50);

  let Icon = Volume1;

  if (volumeIsMute) {
    Icon = VolumeX;
  } else if (volumeIsAboveHalf) {
    Icon = Volume2;
  }

  const label = volumeIsMute ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggle}
              className="text-white p-1.5 hover:bg-white/10 rounded-lg"
            >
              <Icon className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Slider
        className="cursor-pointer w-[8rem]"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};
