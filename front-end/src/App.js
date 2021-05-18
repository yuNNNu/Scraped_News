import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import New from "./pages/New";
// Services
import { getData } from "./services/api.service";
// Animations
import Spinner from "./components/Spinner";
import { Transition, animated } from "react-spring";
class App extends React.Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const data = await getData();
      this.setState({
        loading: false,
        data: data,
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    console.log(
      "The scraped web server configuration it's returning 'Gateway 502 Time out', so for resolve this issue you must refresh the client for two or three times"
    );
    if (this.state.loading === true) {
      return (
        <Transition
          items={this.state.loading}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {(styles, item) =>
            item ? (
              <animated.div style={styles}>
                <Spinner />
              </animated.div>
            ) : (
              ""
            )
          }
        </Transition>
      );
    }
    if (this.state.error) {
      return `Error: ${this.state.error.message}`;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home data={this.state.data} />}
          />
          <Route
            exact
            path="/new/:id"
            render={(props) => <New data={this.state.data} {...props} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
