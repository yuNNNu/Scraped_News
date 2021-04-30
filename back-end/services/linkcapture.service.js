const cheerio = require("cheerio");
const request = require("request-promise");

const getTitularNewLink = async ($) => {
  try {
    var link;
    $(".principal h3 a").each((index, element) => {
      link = $(element).attr("href");
    });
    return link;
  } catch (err) {
    console.log(
      "🚀 ~ file: linkCapture.service.js ~ line 11 ~ getTitularNewLink ~ err",
      err
    );
  }
};

const getSecondaryNewsLink = async ($) => {
  try {
    var links = [];
    $(".secundario article div h4 a").each((index, element) => {
      const link = $(element).attr("href");
      links.push(link);
    });
    return links;
  } catch (err) {
    console.log(
      "🚀 ~ file: linkCapture.service.js ~ line 11 ~ getTitularNewLink ~ err",
      err
    );
  }
};

const getNoticiasItemLinks = async ($) => {
  try {
    var links = [];
    $(".lo-ultimo article div h4 a").each((index, element) => {
      const link = $(element).attr("href");
      links.push(link);
    });
    return links;
  } catch (err) {}
  console.log(
    "🚀 ~ file: linkCapture.service.js ~ line 43 ~ getNoticiasItemLink ~ err",
    err
  );
};

module.exports = {
  getTitularNewLink,
  getSecondaryNewsLink,
  getNoticiasItemLinks,
};
