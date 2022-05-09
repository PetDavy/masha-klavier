export function backgroundImg(video) {
  const youtubePrefix = 'http://img.youtube.com/vi/';
  let backgroundImgData;
  let backgroundPositionData;

  if (video.videoImg) {
    backgroundImgData = `url('${video.videoImg}')`;
  } else if (video.videoExternalImg) {
    backgroundImgData = `url('${video.videoExternalImg}')`;
  } else {
    backgroundImgData = `url('${youtubePrefix}${video.url}/sddefault.jpg')`;
  }

  if (video.videoImgAlign) {
    backgroundPositionData = `${video.videoImgAlign}`;
  } else {
    backgroundPositionData = 'center';
  }

  const backgroundImage = {
    backgroundImage: backgroundImgData,
  };
  const position = {
    backgroundPosition: backgroundPositionData,
  };

  return {
    ...backgroundImage,
    ...position,
  };
}
