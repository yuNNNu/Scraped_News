import React, { Component } from "react";
// Animations
import { Transition, animated } from "react-spring";
class New extends React.Component {
  state = {
    _id: null,
    title: "",
    authoranddate: "",
    img: "",
    resume: "",
    body: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const newsArr = this.props.data["data"];
    const newData = newsArr.filter((x) => x._id === this.props.match.params.id);
    const { title, authoranddate, img, resume, body } = newData[0];
    this.setState({
      title: title,
      authoranddate: authoranddate,
      img: img,
      resume: resume,
      body: body,
      loading: false,
    });
  };

  render() {
    return (
      <Transition
        items={this.state.loading}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(styles, item) =>
          item ? (
            ""
          ) : (
            <animated.div style={styles}>
              <div class="container">
                <div class="row">
                  <div className="col-1"></div>
                  <div class="col-lg-10">
                    <h1 class="mt-4">{this.state.title}</h1>
                    <p class="lead">{this.state.authoranddate}</p>
                    <img
                      class="img-fluid rounded w-100"
                      src={this.state.img}
                      alt="..."
                    />
                    <hr />
                    <p class="lead">{this.state.resume}</p>
                    <blockquote class="blockquote">
                      {this.state.body.map((paragraph) => {
                        return <p>{paragraph}</p>;
                      })}
                    </blockquote>

                    <hr />
                  </div>
                </div>
                <div className="col-1"></div>
              </div>
            </animated.div>
          )
        }
      </Transition>
    );
  }
}
export default New;
