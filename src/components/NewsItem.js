import React from 'react'

function NewsItem(props){

        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div>
                <div className="card" style={{ width: "18rem", marginBottom: "30px", marginRight: "25px", height: "550px", position: "relative" }}>
                    <img style={{maxHeight:"200px"}} src={imageUrl ? imageUrl : "https://img.freepik.com/free-vector/top-headlines-news-themem-background_1017-14199.jpg?w=740&t=st=1695915372~exp=1695915972~hmac=eeb1d266789b44d10aa3ad639c62069d9dfeb1cbb63a64dc9b4900614a52d71e"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <span className="badge rounded-pill text-bg-danger mt-2 mb-2">{source?source:"Unknown"}</span>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn btn-primary" style={{ position: "absolute", bottom: "10px" }}>Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
