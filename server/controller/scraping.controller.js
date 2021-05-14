const cheerio = require("cheerio");
const { getHtml, getNewsObject } = require("../services/parses.service");
const {
  getTitularNewLink,
  getSecondaryNewsLink,
  getNoticiasItemLinks,
} = require("../services/linkcapture.service");

const parseHome = async (req, res) => {
  const url = "https://www.elmostrador.cl/dia/";
  try {
    const $ = await getHtml(url);
    const titularNewLink = await getTitularNewLink($);
    const secondaryNewsLink = await getSecondaryNewsLink($);
    const newsItemLinks = await getNoticiasItemLinks($);
    var newsObj = await parseNotices(
      titularNewLink,
      secondaryNewsLink,
      newsItemLinks,
      null
    );
    if (newsObj["total"] < 10) {
      let numOfLeftOverNews = 10 - newsObj["total"];
      let newsObj2 = await parseMorePages(numOfLeftOverNews);
      newsObj2["data"].map((x) => {
        newsObj["data"].push(x);
      });
    }

    res.status(200).send({
      data: newsObj,
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
  const url = `https://www.elmostrador.cl/dia/page/2/`;
  try {
    const $ = await getHtml(url);
    const newsItemLinks = await getNoticiasItemLinks($);
    const newsObj = await parseNotices(
      null,
      null,
      newsItemLinks,
      numOfLeftOverNews
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
  numOfLeftOverNews
) => {
  try {
    const newsObj = await getNewsObject(
      titularNewLink,
      secondaryNewsLink,
      newsItemLinks,
      numOfLeftOverNews
    );
    return newsObj;
  } catch (err) {
    console.log("🚀 ~ file: scraping.controller.js ~ line 52 ~ err", err);
  }
};

module.exports = {
  parseHome,
};
