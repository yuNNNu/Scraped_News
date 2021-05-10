const cheerio = require("cheerio");
const { getHtml, getNewsObject } = require("../services/parses.service");
const {
  getTitularNewLink,
  getSecondaryNewsLink,
  getNoticiasItemLinks,
} = require("../services/linkcapture.service");
const url = "https://www.elmostrador.cl/dia/";

const parseHome = async (req, res) => {
  try {
    const $ = await getHtml(url);
    const titularNewLink = await getTitularNewLink($);
    const secondaryNewsLink = await getSecondaryNewsLink($);
    const newsItemLinks = await getNoticiasItemLinks($);
    const newsObj = await parseNotices(
      titularNewLink,
      secondaryNewsLink,
      newsItemLinks
    );
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

const parseNotices = async (
  titularNewLink,
  secondaryNewsLink,
  newsItemLinks
) => {
  try {
    const newsObj = await getNewsObject(
      titularNewLink,
      secondaryNewsLink,
      newsItemLinks
    );
    return newsObj;
  } catch (err) {
    console.log("🚀 ~ file: scraping.controller.js ~ line 52 ~ err", err);
  }
};

module.exports = {
  parseHome,
};
