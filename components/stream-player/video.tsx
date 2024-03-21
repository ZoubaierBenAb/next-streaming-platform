"use client";

import {ConnectionState,Track} from 'livekit-client'
import {
  useTracks,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { OfflineVideo } from './offline-video';
import { Loading } from './loading';
import { LiveVideo } from './live-video';


interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export const Video = ({ hostIdentity, hostName }: VideoProps) => {
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)
const tracks = useTracks([
Track.Source.Camera,
Track.Source.Microphone
]).filter((track)=>track.participant.identity === hostIdentity)

let content

if (!participant && connectionState === ConnectionState.Connected){
    content = <OfflineVideo username={hostName}/>}

else if (!participant && tracks.length === 0){
    content = <Loading label={connectionState}/>
}
else{ 
    content = <LiveVideo participant={participant}/>
}
  return <div className="aspect-video border-b group relative">{content}</div>;
};
