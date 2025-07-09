import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState('');

  const key=(e)=>{
    if(e.key==="Enter"){
      
           start()
      

    }
    

  }

  const start = () => {
    axios.get(`https://api.github.com/users/${user}`)
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        alert("Something went wrong. Please check the username.");
        console.error(error);
      });
  };

  return (
    <div className="container shadow mt-5 mx-auto">
      <div className="row">
        <div className="col my-2 ms-3 ">
          <h2>GitHub User Application</h2> 
        </div>
      </div>

      <div className="row my-2 mx-1 pb-4">
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            placeholder="Enter GitHub username"
            onChange={(e) => setUser(e.target.value)} onKeyDown={key}
          />
        </div>
        <div className="col-3">
          <button className="btn btn-outline-primary px-4" onClick={start}>
            Search
          </button>
        </div>
      </div>

      {userData && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <img
                  src={userData.avatar_url}
                  alt="Avatar"
                  height="200px"
                  width="100%"
                />
              </div>
              <div className="card-body">
                <h4>{userData.name || userData.login}</h4>
                <p>{userData.bio || "No bio available."}</p>
              </div>
              <div className="card-footer">
                <a
                  href={userData.html_url}
                  
                  className="btn btn-outline-success"
                >
                  Profile Details
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Username:</strong> {userData.login}
              </li>
              <li className="list-group-item">
                <strong>Public Repos:</strong> {userData.public_repos}
              </li>
              <li className="list-group-item">
                <strong>Followers:</strong> {userData.followers}
              </li>
              <li className="list-group-item">
                <strong>Following:</strong> {userData.following}
              </li>
              <li className="list-group-item">
                <strong>Last Updated:</strong> {new Date(userData.updated_at).toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}




export default App
