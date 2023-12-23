const React = require('react')

function Index(props) {
  return(
    <div>
      <h1>Vegetables Index Page WOOOO</h1>
      <a href="/vegetables/new">Create a new Vegetable here!!!!</a>
      <ul>
        { 
          props.vegetables.map((vegetable) => {
            return (
              <li key={vegetable._id}>
                <a href={`/vegetables/${vegetable._id}`}>{vegetable.name}</a> is {vegetable.color}
              </li>
            )
          })
        }
      </ul>
    </div>
  
  )
}

module.exports = Index