import "./App.css";
import SearchBar from "./components/SearchBarHeader/SearchBarHeader";
import ImageList from "./components/ImageList/ImageList";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchHistoryList, setSearchHistoryList] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) ?? []
  );

  return (
    <div className="App">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        searchHistoryList={searchHistoryList}
      />
      <ImageList
        searchText={searchText.trim()}
        searchHistoryList={searchHistoryList}
        setSearchHistoryList={setSearchHistoryList}
      />
    </div>
  );
}

export default App;
