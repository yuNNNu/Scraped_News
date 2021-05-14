const { getObjByItem } = require("../services/newsbody.service");

const isArray = (item) => {
  return item.constructor === Array;
};

const isNull = (item) => {
  return item === null;
};

const toArray = (item) => {
  const array = [];
  array.push(item);
  return array;
};

const validateIfImgIsEmpty = (img) => {
  return img === "";
};

const getParsed = (unparsednewslinks) => {
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

const parseUndefinedToEmptyValues = (obj) => {
  const { title, authorAndDate, img, resume, body } = obj;
  var _title, _authorAndDate, _img, _resume, _body;
  if (title == undefined) {
    _title = "";
  } else {
    _title = title.trim();
  }
  if (authorAndDate == undefined) {
    _authorAndDate = "";
  } else {
    _authorAndDate = authorAndDate;
  }
  if (img == undefined) {
    _img = "";
  } else {
    _img = img;
  }
  if (resume == undefined) {
    _resume = "";
  } else {
    _resume = resume.trim();
  }
  if (body == undefined) {
    _body = "";
  } else {
    _body = body;
  }
  var objValidated = {
    title: _title,
    authoranddate: _authorAndDate,
    img: _img,
    resume: _resume,
    body: _body,
  };
  return objValidated;
};

const randomId = () => {
  const dateNow = Date.now();
  const random = Math.round(Math.abs(Math.random() + 0.5) * 10000000000);
  let randomNumber = "" + dateNow + random;
  if (randomNumber.length >= 26) {
    randomNumber = randomId();
  }
  return randomNumber;
};

const getFinalObject = async (allLinksArray, numOfLeftOverNews) => {
  const finalObj = [];
  var counter = 0;
  var _newsLeft = 0;
  if (numOfLeftOverNews === null) {
    _newsLeft = 10;
  } else {
    _newsLeft = numOfLeftOverNews;
  }

  await Promise.all(
    allLinksArray.map(async (link) => {
      const objByItemNotValidated = await getObjByItem(link);
      const objByItemValidated = parseUndefinedToEmptyValues(
        objByItemNotValidated
      );
      const { title, authoranddate, img, resume, body } = objByItemValidated;
      const isImgEmpty = validateIfImgIsEmpty(img);
      if (!isImgEmpty && counter < _newsLeft) {
        counter++;
        let newObject = {
          _id: randomId(),
          title: title,
          authoranddate: authoranddate,
          img: img,
          resume: resume,
          body: body,
        };
        finalObj.push(newObject);
      }
    })
  );
  return finalObj;
};

module.exports = {
  isArray,
  toArray,
  getParsed,
  getFinalObject,
  isNull,
};
