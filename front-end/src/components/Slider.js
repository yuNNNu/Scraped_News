import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import EllipsisText from "react-ellipsis-text";
class Slider extends React.Component {
  render() {
    return (
      <Carousel fade>
        {this.props.newsValues.map((_new) => {
          return (
            <Carousel.Item>
              <Link to={`/new/${_new._id}`}>
                <img
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    maxHeight: "450px",
                  }}
                  className="w-100"
                  src={_new.img}
                  alt="First slide"
                />
              </Link>
              <Carousel.Caption style={{ opacity: "0.7" }}>
                <h3 className="bg-dark rounded">
                  <EllipsisText text={_new.title} length={115} tail={'..."'} />
                </h3>
                <p className="bg-dark rounded">
                  <EllipsisText text={_new.resume} length={100} tail={'..."'} />
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

export default Slider;
