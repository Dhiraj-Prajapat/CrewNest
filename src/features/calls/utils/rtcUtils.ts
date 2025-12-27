export const requestMediaPermissions = async (video: boolean = true): Promise<MediaStream | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: video,
    });
    return stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    return null;
  }
};

export const stopMediaStream = (stream: MediaStream | null) => {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
};

export const generateRoomName = () => {
  return `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatCallDuration = (startTime: number): string => {
  const duration = Date.now() - startTime;
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
