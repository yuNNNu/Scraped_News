import React, { Component } from "react";
class New extends React.Component {
  state = {
    _id: null,
    title: "",
    authoranddate: "",
    img: "",
    resume: "",
    body: [],
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
    });
  };

  render() {
    return (
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
    );
  }
}
export default New;
