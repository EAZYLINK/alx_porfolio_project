import React from 'react'

function NavBar({navItems}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">WeChat</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto"> 
          {navItems.map((item, index) => {
            return (
              <li className="nav-item" key={index}>
                <a className="nav-link active" aria-current="page" href={item.link}>{item.name}</a>
              </li>
            )
          })}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default NavBar