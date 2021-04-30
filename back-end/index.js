const cheerio = require("cheerio");
const { getHtml, getNewsObject } = require("./services/parses.service");
const {
  getTitularNewLink,
  getSecondaryNewsLink,
  getNoticiasItemLinks,
} = require("./services/linkcapture.service");
const url = "https://www.elmostrador.cl/dia/";
const parseHome = async () => {
  const $ = await getHtml(url);
  const titularNewLink = await getTitularNewLink($);
  const secondaryNewsLink = await getSecondaryNewsLink($);
  const newsItemLinks = await getNoticiasItemLinks($);
  parseNotices(titularNewLink, secondaryNewsLink, newsItemLinks);
};

const parseNotices = async (
  titularNewLink,
  secondaryNewsLink,
  newsItemLinks
) => {
  const newsObj = await getNewsObject(
    titularNewLink,
    secondaryNewsLink,
    newsItemLinks
  );
};

parseHome();
