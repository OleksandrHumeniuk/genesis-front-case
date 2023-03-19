import React, { FC, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useDispatch } from 'react-redux';
import { showToast } from '@/redux/reducers/toast.reducer';
import { TOAST_STATUS } from '@/types/redux/toast';
import { Box } from '@mui/material';
interface VideoPlayerProps {
  src: string;
  className: string;
  title: string;
  poster: string;
  isAutoPlay?: boolean;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  src,
  poster,
  isAutoPlay = false,
  ...rest
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const hls = new Hls();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    hls.loadSource(src);
    hls.attachMedia(video);

    if (!isAutoPlay) {
      dispatch(
        showToast({
          status: TOAST_STATUS.INFO,
          message: `Use 'h' to slow video and 'j' to speed it up! Right click to open picture-in-picture mode`,
        }),
      );
      video.currentTime = (localStorage.getItem(src) as any) || 0;
    }
  }, [dispatch, hls, isAutoPlay, src, videoRef]);

  const handleTimeUpdate = () => {
    const video = videoRef.current as any;
    if (!video) return;
    localStorage.setItem(src, video.currentTime);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    const video = videoRef.current as any;
    if (e.key === 'h') {
      video.playbackRate = Math.max(video.playbackRate - 0.2, 0);
    } else if (e.key === 'j') {
      video.playbackRate = Math.min(video.playbackRate + 0.2, 3);
    }
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    const video = videoRef.current as any;
    video.requestPictureInPicture();
  };

  if (!src) {
    return (
      <Box
        className={rest.className}
        component="img"
        alt="course preview"
        src="/default.jpg"
      />
    );
  }

  return isAutoPlay ? (
    <video
      preload="auto"
      autoPlay={true}
      muted={true}
      src={src}
      poster={poster ? poster : '/default.jpg'}
      {...rest}
      ref={videoRef}
    />
  ) : (
    <video
      preload="auto"
      autoPlay={isAutoPlay}
      muted={isAutoPlay}
      controls={!isAutoPlay}
      src={src}
      {...rest}
      poster={poster ? poster : '/default.jpg'}
      ref={videoRef}
      onKeyPress={handleKeyPress}
      onContextMenu={handleContextMenu}
      onTimeUpdate={handleTimeUpdate}
    />
  );
};

export default VideoPlayer;
