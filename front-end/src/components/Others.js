import React from "react";
import linkedin from "../assets/img/linkedin.png";
import github from "../assets/img/github.png";
class Others extends React.Component {
  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">ScrapedNews was developed by:</h5>
          <p className="card-text">Nicolás Poblete</p>
          <div className="row mt-1">
            <div className="col-12">
              <a target="_blank" href="https://www.linkedin.com/in/nipob/">
                <img
                  src={linkedin}
                  alt="linkedin"
                  style={{ height: "55px", width: "55px" }}
                ></img>
              </a>
              <a target="_blank" href="https://github.com/yuNNNu">
                <img
                  src={github}
                  alt="linkedin"
                  style={{ height: "55px", width: "55px" }}
                ></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Others;
