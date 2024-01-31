import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <NavBar />
            < Route exact path="/" element={<News pageSize={6} category={"general"} />} />
            < Route exact path="/business" element={<News pageSize={6} category={"business"} />} />
            < Route exact path="/entertai" element={<News pageSize={6} category={"entertainment"} />} />
            < Route exact path="/health" element={<News pageSize={6} category={"health"} />} />
            < Route exact path="/science" element={<News pageSize={6} category={"science"} />} />
            < Route exact path="/sports" element={<News pageSize={6} category={"sports"} />} />
            < Route exact path="/technology" element={<News pageSize={6} category={"technology"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}