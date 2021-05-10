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
    console.log("🚀 ~ file: services.js ~ line 12 ~ getHtml ~ err", err);
  }
};

const getObjByItem = async (url) => {
  try {
    const $ = await getHtml(url);
    var title = $(".datos-noticias div h2").html();
    const authorAndDate = $(".datos-noticias div p.autor-y-fecha").text();
    var linkImg;
    $(".noticia-single-post figure img").each((index, element) => {
      linkImg = $(element).attr("src");
    });
    const resume = $(".noticia-single-post figure figcaption").text();
    var newBody = [];
    $(".cuerpo-noticia p").each((index, element) => {
      const paragraph = $(element).text().trim();
      newBody.push(paragraph);
    });
    const itemObj = {
      title: title,
      authorAndDate: authorAndDate,
      img: linkImg,
      resume: resume,
      body: newBody,
    };
    return itemObj;
  } catch (err) {
    console.log(
      "🚀 ~ file: newsbody.service.js ~ line 38 ~ getObjByItem ~ err",
      err
    );
    const itemObj = [
      {
        title: "",
        authorAndDate: "",
        img: "",
        resume: "",
        body: "",
      },
    ];
    return itemObj;
  }
};

module.exports = {
  getObjByItem,
};
