import { useState } from "react";

import Header from "../../components/Header"
import ItemList from "../../components/ItemList"

import "./styles.css"

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState('alexandreContee');
  const [repositories, setRepositories] = useState(null);

  const handleGetData = async (e) => {
    e.preventDefault()
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if (newUser.name) {
      const { avatar_url, name, bio } = newUser
      console.log(avatar_url, name, bio)
      setCurrentUser(newUser)

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json()
      console.log(newRepos)
      if (newRepos.length) {
        setRepositories(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div>
        <div className="search">
          <form onSubmit={handleGetData}>
            <input
              type="text"
              placeholder="@username"
              name="username"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            <button type={"submit"}>Search</button>
          </form>
        </div>
        {
          currentUser?.name ? (
            <>
              <div className="profile">
                <img src={currentUser.avatar_url} alt="Profile" />
                <div className="info">
                  <h3>{currentUser.name}</h3>
                  <a href="https://github.com/AlexandreContee">
                    <p>@{currentUser.login}</p>
                  </a>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null
        }
        {
          repositories?.length ? (
            <div className="repositories">
              <h4>Repositories</h4>
              {repositories?.map(rep => (
                <>
                  <ItemList key={rep.id} title={rep.full_name} description={rep.description} />
                </>
              ))}
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

export default App;
