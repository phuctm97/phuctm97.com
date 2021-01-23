const getCover = (file) => {
  const { title, cover } = file.data;
  if (cover && cover.url) return { url: cover.url };

  const url = new URL(
    encodeURIComponent(`${title}.jpg`),
    "https://img.phuctm97.com/api/v2/"
  );

  const icons = (cover && cover.icons) || [];
  for (let icon of icons) {
    url.searchParams.append("icons", icon);
  }

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  };
};

module.exports = () => (_, file) => {
  Object.assign(file.data, { cover: getCover(file) });
};
