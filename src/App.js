import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import NewUserScreen from './screens/NewUserScreen';
import StatsScreen from './screens/StatsScreen';
import FindPeople from './screens/FindPeople';
import ProfileScreen from './screens/ProfileScreen';
import { useEffect } from 'react';

import icon from './toggle-on-solid.png';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  useEffect(() => {
      const favicon = document.getElementById('favicon');
      favicon.setAttribute('href', icon);
  }, []);
  return (
    <Router>
        <Header />
        <main className='py-5'>
            <Container>
                <Routes>
                    <Route path="/" element={<HomeScreen />} exact />
                    <Route path="/login" element={<LoginScreen />} exact />
                    <Route path="/signup" element={<SignupScreen />} exact />
                    <Route path="/dashboard" element={<DashboardScreen />} exact />
                    <Route path="/new-user" element={<NewUserScreen />} exact />
                    <Route path="/stats" element={<StatsScreen />} exact />
                    <Route path="/people" element={<FindPeople />} exact />
                    <Route path="/profile" element={<ProfileScreen />} exact />
                    
                </Routes>
            </Container>
        </main>
        <Footer />
    </Router>
  )
}

export default App;