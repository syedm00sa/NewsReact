import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

  static propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 20,
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4a793f740804fd2a1aecc6f4a642ce2&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedJson = await data.json();
    this.setState({
      articles: parsedJson.articles, page: 1,
      loading: false, totalResults: parsedJson.totalResults,
    })
  }

  handlePreviewClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4a793f740804fd2a1aecc6f4a642ce2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedJson = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedJson.articles,
      loading: false
    })
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4a793f740804fd2a1aecc6f4a642ce2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedJson = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedJson.articles,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 style={{ margin: '35px 0px' }}><strong>ATNews - top headlines</strong></h1>
        <div className="row">
          {this.state.loading && <Spinner />}
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title !== null && element.title !== undefined && element.title.slice(0, 45)}
                description={element.description !== null && element.description !== undefined && element.description.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className='btn btn-primary' onClick={this.handlePreviewClick}> &larr; Preview</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-primary mx-2' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div >
    )
  }
}

export default News
