const { getObjByItem } = require("../services/newsbody.service");

const isArray = (item) => {
  return item.constructor === Array;
};

const toArray = (item) => {
  const array = [];
  array.push(item);
  return array;
};

const getParsed = (unparsednewslinks) => {
  const parsedNewsLinks = [];
  unparsednewslinks.map((item) => {
    if (isArray(item)) {
      item.map((x) => {
        parsedNewsLinks.push(x);
      });
    } else {
      parsedNewsLinks.push(item);
    }
  });
  return parsedNewsLinks;
};

const validateObject = (obj) => {
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
  const randomNumber = Math.round(Math.abs(Math.random() + 0.5) * 10000000000);
  let buyOrder = "" + dateNow + randomNumber;
  if (buyOrder.length >= 26) {
    buyOrder = randomId();
  }
  return buyOrder;
};

const getObject = async (allLinksArr) => {
  const finalObj = [];
  await Promise.all(
    allLinksArr.map(async (link) => {
      const objByItemNotValidated = await getObjByItem(link);
      const objByItemValidated = validateObject(objByItemNotValidated);
      const { title, authoranddate, img, resume, body } = objByItemValidated;
      let newObject = {
        _id: randomId(),
        title: title,
        authoranddate: authoranddate,
        img: img,
        resume: resume,
        body: body,
      };
      finalObj.push(newObject);
    })
  );
  return finalObj;
};

module.exports = {
  isArray,
  toArray,
  getParsed,
  getObject,
};
