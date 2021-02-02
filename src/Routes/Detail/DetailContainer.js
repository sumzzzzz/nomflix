/* eslint-disable import/no-anonymous-default-export */
import { movieApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props); // 이 때 pathname값 생김
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      // 현재 위치가 movie인지 show인지 알아냄
      isMovie: pathname.includes("/movie/"),
      isShow: pathname.includes("/show/"),
    };
  }

  state = {
    result: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;

    const { isMovie, isShow } = this.state;

    // 어떤 id 값을 갖고 있는지 알아냄
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      // id 값이 숫자가 아닌 경우 home으로 이동
      push("/");
    }

    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else if (isShow) {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
