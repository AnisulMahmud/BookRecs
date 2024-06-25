import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import BookList from "./component/BookList/BookList";
import BookDetails from "./component/BookDetails/BookDetails";
import Navbar from "./component/NavBar";
import SignUp from "./component/SignUp";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
