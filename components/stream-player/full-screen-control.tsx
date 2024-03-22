'use client'

import {Maximize, Minimize } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface FullScreenControlProps{
    isFullScreen : boolean,
    onToggle : ()=>void
}


export const FullScreenControl = ({isFullScreen,onToggle}:FullScreenControlProps)=>{



const label = isFullScreen? 'Exit full screen' : 'Fullscreen'
const Icon = isFullScreen? Maximize : Minimize



    
    return (
        <div className="flex items-center justify-center gap-4 ">
             <TooltipProvider>
            <Tooltip >
              <TooltipTrigger asChild>
                <button
                  onClick={onToggle}
                
                  className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                 <Icon className="h-5 w-5"/>
                </button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>
    )

}