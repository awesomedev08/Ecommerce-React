import { useParams } from "react-router-dom";
import style from "./SinglesPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import COMPLoading from "../../components/loading/COMPLoading";
function SinglesPage() {
  const { id } = useParams();

  let [article, setArticle] = useState([]);
  let [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(false);
    axios
      .get(`${process.env.REACT_APP_URL_API}singles-pages/${id}`)
      .then((response) => {
        setArticle(response.data.data);
        setloading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div className="container SinglesPage">
      {!loading ? (
        <COMPLoading />
      ) : (
        <>
          <h1>{article.attributes?.title}</h1>
          <ReactMarkdown>{article.attributes?.body}</ReactMarkdown>
        </>
      )}
    </div>
  );
}

export default SinglesPage;
