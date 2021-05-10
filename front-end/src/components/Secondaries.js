import React, { Component } from "react";
import { Link } from "react-router-dom";
import EllipsisText from "react-ellipsis-text";
class Secondaries extends React.Component {
  render() {
    return (
      <div className="row pl-3 pr-3">
        <div className="card-deck">
          {this.props.newsValues.map((_new) => {
            return (
              <div className="card">
                <div className="hovereffect">
                  <img
                    style={{ width: "530px", height: "350px" }}
                    className="img-fluid"
                    src={_new.img}
                    alt="Card image cap"
                  />
                  <div className="overlay">
                    <Link className="info" to={`/new/${_new._id}`}>
                      Ver más
                    </Link>
                  </div>
                </div>

                <div className="m-3">
                  <h5>
                    <EllipsisText
                      text={_new.title}
                      length={100}
                      tail={'..."'}
                    />
                  </h5>
                  <p>
                    <EllipsisText
                      text={_new.resume}
                      length={285}
                      tail={'..."'}
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Secondaries;
