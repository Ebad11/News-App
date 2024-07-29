import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


function News(props){

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  function capitalize(str) {
    let nfc = str[0].toUpperCase();
    let nstr = nfc + str.slice(1);
    return nstr;
  }

 const updateNews= async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=16b326a975b7495e9ed9250bc3f32478&page=${page}&pageSize=${props.pageSize}`
   setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
    }

    useEffect(() => {

      document.title = `NewsMonkey- ${capitalize(props.category)}`;
      updateNews();
      // eslint-disable-next-line
    }, [])
    
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=16b326a975b7495e9ed9250bc3f32478&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
     setArticles(articles.concat(parsedData.articles))
     setTotalResults(parsedData.totalResults)
     setLoading(false)
  };

    return (
      <div className='container-sm p-4 d-flex flex-column justify-content-between' style={{ maxWidth: "1300px", minHeight: "750px" }}>

        <h2 className='mt-5 md-4'>{capitalize(props.category)} - Top headlines</h2>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults && articles.length <= totalResults}
          loader={<Spinner/>}
        >

          <div className="line d-flex align-items-center justify-content-center flex-column flex-wrap flex-md-row my-4">
            {articles.map((element) => {
              return (<NewsItem key={element.url} title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) + "..." : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              )
            })}
          </div>

        </InfiniteScroll>

      </div>
    )
  
}

News.defaultProps =
{
  pageSize: 8,
  country: "in",
  category: "general",
  page: 1
}

News.propTypes =
{
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}
export default News;
