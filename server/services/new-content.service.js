const cheerio = require("cheerio");
const request = require("request-promise");
const { getHtml } = require("./get-html.service");

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
    const obj = {
      title: title,
      authorAndDate: authorAndDate,
      img: linkImg,
      resume: resume,
      body: newBody,
    };
    return obj;
  } catch (err) {
    console.log(
      "🚀 ~ file: new-content.service.js ~ line 40 ~ getObjByItem ~ err",
      err
    );
    const obj = [
      {
        title: "",
        authorAndDate: "",
        img: "",
        resume: "",
        body: "",
      },
    ];
    return obj;
  }
};

module.exports = {
  getObjByItem,
};
