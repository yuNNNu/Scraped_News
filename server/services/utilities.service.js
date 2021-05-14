const toArray = (item) => {
  const array = [];
  array.push(item);
  return array;
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

const howManyNewsLeft = (numOfLeftOverNews, numberOfNewsNeeded) => {
  var newsLeft;
  if (numOfLeftOverNews === null) {
    newsLeft = numberOfNewsNeeded;
  } else {
    newsLeft = numOfLeftOverNews;
  }
  return newsLeft;
};

module.exports = {
  toArray,
  randomId,
  howManyNewsLeft,
};
