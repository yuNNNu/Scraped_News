const cheerio = require("cheerio");
const request = require("request-promise");

const getHtml = async (url) => {
  try {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const response = await request({
      uri: url,
      transform: (body) => cheerio.load(body),
    });
    return response;
  } catch (err) {
    getHtml(url);
    console.log("🚀 ~ file: services.js ~ line 12 ~ getHtml ~ err", err);
  }
};

module.exports = {
  getHtml,
};
