"use client";

import { atom, useAtom } from "jotai";
import type { CallState } from "../types";

const initialCallState: CallState = {
  activeCall: null,
  isInCall: false,
  isConnecting: false,
  localAudio: true,
  localVideo: false,
  participants: [],
  error: null,
};

const callStateAtom = atom<CallState>(initialCallState);

export const useCallState = () => {
  const [callState, setCallState] = useAtom(callStateAtom);

  const setActiveCall = (call: CallState['activeCall']) => {
    setCallState(prev => ({ ...prev, activeCall: call }));
  };

  const setIsInCall = (isInCall: boolean) => {
    setCallState(prev => ({ ...prev, isInCall }));
  };

  const setIsConnecting = (isConnecting: boolean) => {
    setCallState(prev => ({ ...prev, isConnecting }));
  };

  const toggleLocalAudio = () => {
    setCallState(prev => ({ ...prev, localAudio: !prev.localAudio }));
  };

  const toggleLocalVideo = () => {
    setCallState(prev => ({ ...prev, localVideo: !prev.localVideo }));
  };

  const setParticipants = (participants: CallState['participants']) => {
    setCallState(prev => ({ ...prev, participants }));
  };

  const setError = (error: string | null) => {
    setCallState(prev => ({ ...prev, error }));
  };

  const resetCallState = () => {
    setCallState(initialCallState);
  };

  return {
    callState,
    setActiveCall,
    setIsInCall,
    setIsConnecting,
    toggleLocalAudio,
    toggleLocalVideo,
    setParticipants,
    setError,
    resetCallState,
  };
};
