const cheerio = require("cheerio");
const request = require("request-promise");
const { getParsed, getFinalObject } = require("./utilities.service");
const getHtml = async (url) => {
  try {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const response = await request({
      uri: url,
      transform: (body) => cheerio.load(body),
    });
    return response;
  } catch (err) {
    console.log("🚀 ~ file: services.js ~ line 12 ~ getHtml ~ err", err);
  }
};

const getNewsObject = async (
  titularNewLink,
  secondaryNewsLink,
  newsItemLinks,
  numOfLeftOverNews
) => {
  const unparsedNewsLinks = [titularNewLink, secondaryNewsLink, newsItemLinks];
  try {
    const allLinksArr = getParsed(unparsedNewsLinks);
    const finalObj = await getFinalObject(allLinksArr, numOfLeftOverNews);
    const temp = {
      total: finalObj.length,
      data: finalObj,
    };
    return temp;
  } catch (err) {
    console.log("🚀 ~ file: parses.service.js ~ line 29 ~ err", err);
  }
};

module.exports = {
  getHtml,
  getNewsObject,
};
