import React, {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor (props) {
    super(props)
    this.state={}
  //  console.log("This is my initializer")

  //  const movies = [
  //    {id: 0, poster_src:"https://image.tmdb.org/t/p/w94_and_h141_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", 
  //    title: "Avengers: Infinity War", overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos."},
  //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w94_and_h141_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
  //     title: "Avengers", overview: "This is my second overview"},

  //  ]

  //   var movieRows = []

  //   movies.forEach((movie) => {
  //     console.log(movie.title)
  //     const movieRow = <MovieRow movie={movie}/>
  //     movieRows.push(movieRow)
  //   })

  //   this.state = {rows: movieRows}

  this.performSearch("avengers")
    
  }

  performSearch(searchTerm){
    console.log("Perform search using moviedb")
    const urlstring="https://api.themoviedb.org/3/search/movie?&api_key=146827c2aa8199b97beb78aa36382750&query=" + searchTerm 
    $.ajax({
    url: urlstring,
    success: (searchResults) => {
      console.log("Fetched data successfully")
      const results = searchResults.results
     // console.log(results)

     var movieRows =[]

      results.forEach((movie) => {
        movie.poster_src="https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path
      //  console.log(movie.poster_path)
        const movieRow= <MovieRow key ={movie.id} movie={movie}/>
        movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      console.error("Failed to fetch data")
    }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
  return (
    <div>
      <table className="titleBar">
        <tbody>
          <tr>
            <td>
              <img alt="app icon" width="50" src="green_app_tra.png"/>
            </td>
            <td width="8"/>
            <td>
              <h1>MoviesDB Search</h1>
            </td>
          </tr>
        </tbody>
      </table>

      <input style={{
        fontSize: 24,
        display: 'block',
        width: '99%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16
      }}
      onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>
      
      {this.state.rows}
    </div>
  );
  }
}

export default App;
