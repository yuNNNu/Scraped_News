const cheerio = require("cheerio");
const request = require("request-promise");
const {
  undefinedToEmptyValues,
  isNull,
  isArray,
  isImgEmpty,
} = require("./validations.service");
const { randomId, howManyNewsLeft } = require("./utilities.service");
const { getObjByItem } = require("./new-content.service");

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

const getParsedUnparsedLinksToScrape = (unparsednewslinks) => {
  const parsedNewsLinks = [];
  unparsednewslinks.map((item) => {
    if (!isNull(item)) {
      if (isArray(item)) {
        item.map((x) => {
          parsedNewsLinks.push(x);
        });
      } else {
        parsedNewsLinks.push(item);
      }
    }
  });
  return parsedNewsLinks;
};

const getData = async (
  linksToScrape,
  numOfLeftOverNews,
  numberOfNewsNeeded
) => {
  const obj = [];
  var counter = 0;
  var newsLeft = howManyNewsLeft(numOfLeftOverNews, numberOfNewsNeeded);
  try {
    await Promise.all(
      linksToScrape.map(async (link) => {
        const objByItemNotValidated = await getObjByItem(link);
        const objByItemValidated = undefinedToEmptyValues(
          objByItemNotValidated
        );
        const { title, authoranddate, img, resume, body } = objByItemValidated;
        var _isImgEmpty = isImgEmpty(img);
        if (!_isImgEmpty && counter < newsLeft) {
          counter++;
          let newObject = {
            _id: randomId(),
            title: title,
            authoranddate: authoranddate,
            img: img,
            resume: resume,
            body: body,
          };
          obj.push(newObject);
        }
      })
    );
    return obj;
  } catch (err) {
    console.log("🚀 ~ file: parses.service.js ~ line 101 ~ err", err);
  }
};

const getNewsObject = async (
  titularNewLink,
  secondaryNewsLink,
  newsItemLinks,
  numOfLeftOverNews,
  numberOfNewsNeeded
) => {
  const unparsedLinksToScrape = [
    titularNewLink,
    secondaryNewsLink,
    newsItemLinks,
  ];
  try {
    const linksToScrape = getParsedUnparsedLinksToScrape(unparsedLinksToScrape);
    const newsData = await getData(
      linksToScrape,
      numOfLeftOverNews,
      numberOfNewsNeeded
    );
    const obj = {
      total: newsData.length,
      data: newsData,
    };
    return obj;
  } catch (err) {
    console.log("🚀 ~ file: parses.service.js ~ line 29 ~ err", err);
  }
};

module.exports = {
  getHtml,
  getNewsObject,
};
