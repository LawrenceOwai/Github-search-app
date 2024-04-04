import { useState } from "react";
import './App.css';

const API_BASE_URL = "https://api.github.com";

async function fetchSearchResults(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

function User({ avatar, url, username }) {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}

function Form({ onSubmit, onChange, value }) {
  return (
    <form className="search-form " onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
        className="search-input"
      />
      <button type="submit" className="btn btn-success search-button">Search</button>
    </form>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function onSearchChange(event) {
    setQuery(event.target.value);
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    const results = await fetchSearchResults(query);
    setResults(results);
  }

  return (
    
    <div className="app">
      <main className="main">
        <div className="container mt-3 mb-3 ">
          <div className="row">
               <div className="btn btn-info text-white">
                  <h2>GitHub User Search</h2>
              </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
               <div className="btn btn-">
                  <Form 
                      onChange={onSearchChange}
                      onSubmit={onSearchSubmit}
                      value={query}
                  />
              </div>
          </div>
        </div>

        <div className="container">       {/** container helps you contain that segment of code in a container compartment*/}
          <div className="">              {/**you only nee to have a claasname=row when you want the content to fill the entire row of the page from right to left,  */}
              <div className="btn btn-outline-info text-black">        {/**btn-outline-secondaryb is styling the outline shape like the line */}
                  <h3>Results</h3>
                  <div id="results">
                        <div>
                          {results.map((user) => (
                            <User
                            key={user.login}
                            avatar={user.avatar_url}
                                url={user.html_url}
                            username={user.login}
                          />
                          ))}
                        </div>
                  </div>
              </div>
           </div>
        </div>
        {/**comment jrjrj*/}

        
      </main>
    </div>
  );

}

export default App;
