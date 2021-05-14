const cheerio = require("cheerio");
const { getHtml, getNewsObject } = require("../services/parses.service");
const {
  getTitularNewLink,
  getSecondaryNewsLink,
  getNoticiasItemLinks,
} = require("../services/linkcapture.service");

const url = "https://www.elmostrador.cl/dia/";
const numberOfNewsNeeded = 12;

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
