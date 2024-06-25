import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import '../css/menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Menu() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showReauthForm, setShowReauthForm] = useState(false);
  const [password, setPassword] = useState('');
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (currentUser) {
      try {
        if (showReauthForm) {
          // Re-authenticate user
          const credential = EmailAuthProvider.credential(currentUser.email, password);
          await reauthenticateWithCredential(currentUser, credential);
        }

        // Delete user's watchlist and ratedList from Firestore
        const watchlistCollection = collection(db, 'users', currentUser.uid, 'watchlist');
        const ratedListCollection = collection(db, 'users', currentUser.uid, 'ratedList');

        const watchlistDocs = await getDocs(watchlistCollection);
        const ratedListDocs = await getDocs(ratedListCollection);

        watchlistDocs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        ratedListDocs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        // Delete user's main document
        await deleteDoc(doc(db, 'users', currentUser.uid));

        // Delete user authentication
        await deleteUser(currentUser);

        console.log('User account and data deleted');
        window.location.reload(); // Refresh the page after account deletion
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          setShowReauthForm(true);
        } else {
          console.error('Error deleting account:', error);
        }
      }
    }
  };

  const handleReauth = async (e) => {
    e.preventDefault();
    await handleDeleteAccount();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/watchlist"
              className={location.pathname === "/watchlist" ? "nav-link active" : "nav-link"}
            >
              Watchlist
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center">
          {currentUser ? (
            <>
              <span className="nav-link" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} color="white" />
              </span>
              <Link to="#" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
              {dropdownOpen && (
                <ul className="dropdown-menu show">
                  <li><button className="dropdown-item" onClick={handleDeleteAccount}>Delete Account</button></li>
                </ul>
              )}
            </>
          ) : (
            location.pathname === '/' && (
              <Link
                to="/sign-in"
                className={location.pathname === "/sign-in" ? "nav-link active" : "nav-link"}
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
      {showReauthForm && (
        <div className="reauth-form">
          <form onSubmit={handleReauth}>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Confirm</button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Menu;
