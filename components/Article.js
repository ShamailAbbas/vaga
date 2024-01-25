// components/Article.js
const Article = ({ title, text }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default Article;
