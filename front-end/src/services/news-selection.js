export const getPrimary = (news) => {
  console.log(
    "🚀 ~ file: news-selection.js ~ line 2 ~ getPrimary ~ news",
    news
  );
  const primaryNews = [];
  primaryNews.push(news[0]);
  primaryNews.push(news[3]);
  primaryNews.push(news[4]);
  return primaryNews;
};

export const getSecondary = (news) => {
  const secondaryNews = [];
  secondaryNews.push(news[1]);
  secondaryNews.push(news[2]);
  return secondaryNews;
};

export const getOthers = (news) => {
  const otherNews = [];
  otherNews.push(news[5]);
  otherNews.push(news[6]);
  otherNews.push(news[7]);
  otherNews.push(news[8]);
  otherNews.push(news[9]);
  return otherNews;
};
