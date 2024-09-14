import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/login';
import SignUp from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to='/login' />}

            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to='/' />}

            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to='/' />}

            />

          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;


// now lets start our frontend

// currently no crendentials are registered in our database...

//let's register a new user

// the password is hashed while storing it in the database...ans i'm using JWT(Json Web Token) for securing our authentication

//once the user is registered, they can login to the application

// a task card is added...

// I used context hooks to enable real time updates without loading the page...

//All the CRUD operations are implemented..we have created some cards...let's do other operations aswell

//let's logout and check in again...and see whether our tasks are...linked with our user credentials or not..