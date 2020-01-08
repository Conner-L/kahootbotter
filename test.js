const Searcher = require("kahoot-search");
const config = {
  language: ["es"],
  questionLength: 9,
};
const search = new Searcher("January", config);
search.search().then(results=>{
  console.log(results);
});
