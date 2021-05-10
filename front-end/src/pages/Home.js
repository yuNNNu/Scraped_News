import React, { Component } from "react";
import "../App.css";
//// Components
import Slider from "../components/Slider";
import Secondaries from "../components/Secondaries";
import Rightsection from "../components/Rightsection";
import Others from "../components/Others";
/// Services
import {
  getPrimary,
  getSecondary,
  getOthers,
} from "../services/news-selection";
import _Data from "../assets/data/data.json";
// Animations
import { Transition, animated } from "react-spring";
class Home extends React.Component {
  state = {
    primary: [],
    secondary: [],
    others: [],
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const data = this.props.data.data;
      // const data = _Data.data;
      const primaryNewsArray = getPrimary(data);
      const secondaryNewsArray = getSecondary(data);
      const otherNewsArray = getOthers(data);
      this.setState({
        loading: false,
        primary: primaryNewsArray,
        secondary: secondaryNewsArray,
        others: otherNewsArray,
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
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
              <div className="App">
                <div className="row" style={{ height: "50px" }}>
                  <div className="col-12 d-flex justify-content-end">AA</div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-7">
                    <div className="mb-3">
                      <Slider newsValues={this.state.primary} />
                    </div>
                    <div>
                      <Secondaries newsValues={this.state.secondary} />
                    </div>
                  </div>
                  <div className="col-3 mt-3">
                    <section>
                      <Rightsection newsValues={this.state.others} />
                    </section>
                  </div>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-9 ml-5">
                    <Others />
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
            </animated.div>
          )
        }
      </Transition>
    );
  }
}

export default Home;
