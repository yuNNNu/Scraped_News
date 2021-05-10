import React from "react";
import EllipsisText from "react-ellipsis-text";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
class Rightsection extends React.Component {
  render() {
    return (
      <div
        style={{
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {this.props.newsValues.map((_new) => {
          return (
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="card mb-5 mt-3">
                <div className="row no-gutters">
                  <div className="col-8">
                    <Link
                      className="text-reset text-decoration-none"
                      to={`/new/${_new._id}`}
                    >
                      <div className="card-block px-2">
                        <h6 className="mt-3">
                          <EllipsisText
                            text={_new.title}
                            length={65}
                            tail='..."'
                          />
                        </h6>
                        <p className="card-text">
                          <EllipsisText
                            text={_new.resume}
                            length={100}
                            tail='..."'
                          />
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-4">
                    <img
                      src={_new.img}
                      className="img-fluid"
                      alt=""
                      style={{ height: "150px", width: "200px" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }
}

export default Rightsection;
