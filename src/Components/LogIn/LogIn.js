import React, { useContext, useState } from 'react';
import './LogIn.css'
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import firebaseConfig from '../../FirebasConfig/FirebaseConfig';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }

const LogIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [userInfo, setUserInfo] = useState({
        isSignIn: false,
        username: '',
        email:'',
        photo:'',
    })
    const handleGoogleSignIn = () => {
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const userSignIn = {
                    username: displayName,
                    photo: photoURL,
                    email: email,
                    isSignIn: true
                };
                setUserInfo(userSignIn)
                setLoggedInUser(userSignIn)
                history.replace(from)
                // console.log(userSignIn.username);
            }).catch((error) => {
                console.log(error.message);
            });
                }

                const handleFacebookSignIn = () => {
                    const FacebookProvider = new firebase.auth.FacebookAuthProvider();
                    firebase
                        .auth()
                        .signInWithPopup(FacebookProvider)
                        .then((result) => {
                            const { displayName, email, photoURL } = result.user;
                            const userSignIn = {
                                username: displayName,
                                photo: photoURL,
                                email: email,
                                isSignIn: true
                            };
                            setUserInfo(userSignIn)
                            setLoggedInUser(userSignIn)
                            history.replace(from)
                            // console.log(userSignIn.username);
            
                        })
                        .catch((error) => {
                            console.log(error.message);
                })
            }

    return (
        <div className="main-container">
            <div className="card-container">
        <div className="single-card">
            <div className="face face1">
                <div className="content">
                    <img src="http://pngimg.com/uploads/google/google_PNG19630.png" alt='..'/>
                    <h3>LogIn With Google</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                <Button onClick={handleGoogleSignIn} variant="danger"><img src="http://pngimg.com/uploads/google/google_PNG19630.png" width='30px' alt='..'/> Login</Button>
                </div>
            </div>
        </div>
    </div>
            <div className="card-container">
        <div className="single-card">
            <div className="face face1">
                <div className="content">
                    <img src="https://freepngimg.com/thumb/facebook/24751-6-facebook-logo-file.png" alt='..'/>
                    <h3>LogIn With Facebook</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                <Button onClick={handleFacebookSignIn} variant="danger"><img src="https://freepngimg.com/thumb/facebook/24751-6-facebook-logo-file.png" width='30px' alt='..'/> Login</Button>
                </div>
            </div>
        </div>
    </div>
        </div>
    );
};

export default LogIn;