const isArray = (item) => {
  return item.constructor === Array;
};

const isNull = (item) => {
  return item === null;
};

const isImgEmpty = (img) => {
  return img === "";
};

const undefinedToEmptyValues = (obj) => {
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

module.exports = {
  isArray,
  isNull,
  isImgEmpty,
  undefinedToEmptyValues,
};
