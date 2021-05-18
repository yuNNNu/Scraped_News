const cheerio = require("cheerio");
const { getNewsObject } = require("../services/parses.service");
const { getHtml } = require("../services/get-html.service");
const {
  getTitularNewLink,
  getSecondaryNewsLink,
  getNoticiasItemLinks,
} = require("../services/linkcapture.service");

const url = "https://www.elmostrador.cl/dia/"; // <-- Here it's the url to scrape(No modifiable)
const numberOfNewsNeeded = 10; // <-- Here you can set how many news do you need to scrape

const parseHome = async (req, res) => {
  try {
    const $ = await getHtml(url);
    const titularNewLink = await getTitularNewLink($);
    const secondaryNewsLink = await getSecondaryNewsLink($);
    const newsItemLinks = await getNoticiasItemLinks($);
    var breakingNewsData = await parseNotices(
      titularNewLink,
      secondaryNewsLink,
      newsItemLinks,
      null,
      numberOfNewsNeeded
    );
    const totalOfNewsReceived = breakingNewsData["total"];
    if (totalOfNewsReceived < numberOfNewsNeeded) {
      let numOfLeftOverNews = numberOfNewsNeeded - totalOfNewsReceived;
      let leftOverNews = await parseMorePages(numOfLeftOverNews);
      leftOverNews["data"].map((breakingNew) => {
        breakingNewsData["data"].push(breakingNew);
        breakingNewsData["total"] = breakingNewsData["total"] + 1;
      });
    }

    res.status(200).send({
      data: breakingNewsData,
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: scraping.controller.js ~ line 17 ~ parseHome ~ err",
      err
    );
    res.status(400).send({
      err: err,
    });
  }
};

const parseMorePages = async (numOfLeftOverNews) => {
  let nextPageUrl = `${url}page/2/`;
  try {
    const $ = await getHtml(nextPageUrl);
    const newsItemLinks = await getNoticiasItemLinks($);
    const newsObj = await parseNotices(
      null,
      null,
      newsItemLinks,
      numOfLeftOverNews,
      numberOfNewsNeeded
    );
    return newsObj;
  } catch (err) {
    console.log(
      "🚀 ~ file: scraping.controller.js ~ line 39 ~ parseMorePages ~ err",
      err
    );
  }
};

const parseNotices = async (
  titularNewLink,
  secondaryNewsLink,
  newsItemLinks,
  numOfLeftOverNews,
  numberOfNewsNeeded
) => {
  try {
    const newsObj = await getNewsObject(
      titularNewLink,
      secondaryNewsLink,
      newsItemLinks,
      numOfLeftOverNews,
      numberOfNewsNeeded
    );
    return newsObj;
  } catch (err) {
    console.log("🚀 ~ file: scraping.controller.js ~ line 52 ~ err", err);
  }
};

module.exports = {
  parseHome,
};
