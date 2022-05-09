export function getListOrder(videos, slug) {
  let listOrder = 0;
  const videosWithSameSlug = videos.filter(video => video.slug === slug);

  if (videosWithSameSlug.length) {
    listOrder = Math.max(
      ...videosWithSameSlug.map(video => video.listOrder),
    ) + 1;
  }

  return listOrder;
}

export function getAvailableOrder(videos) {
  const topOrder = getTopOrder(videos);

  return topOrder + 1;
}

export function getTopOrder(videos) {
  return videos.reduce((acc, video) => {
    if (video.order > acc) {
      return video.order;
    }

    return acc;
  }, 0);
}

export function getTopListOrder(videos) {
  return videos.reduce((acc, video) => {
    if (video.listOrder > acc) {
      return video.listOrder;
    }

    return acc;
  }, 1);
}
