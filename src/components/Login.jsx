import React, { useState, useEffect } from "react";
import firebase from "../Firebase/firebase";

const auth = firebase.auth();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      let finalUser = user ? user.uid : null;
      setUserId(finalUser);
    });
  }, []);

  const loginFn = async () => {
    try {
      setLoginLoader(true);

      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res.user.uid);
      setLoginLoader(false);
      setUserId(res.user.uid);

      console.log(res);
    } catch (err) {
      setLoginLoader(false);
      setError(err.message);

      setTimeout(() => {
        setError("");
      }, 2000);

      console.log(err);
    }
  };

  const logout = async () => {
    try {
      setLoginLoader(true);

      let res = await auth.signOut();

      setLoginLoader(false);
      setUserId("");
    } catch (err) {
      setLoginLoader(false);
      setError(err.message);

      setTimeout(() => {
        setError("");
      }, 2000);

      console.log(err);
    }
  };

  return loginLoader ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1> {error}</h1>
  ) : userId ? (
    <>
      <h1>{userId}</h1>
      <button onClick={logout}>Sign out</button>
    </>
  ) : (
    <div>
      <div>
        Email:
        <input
          type="Email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button onClick={loginFn}> Sign in</button>
    </div>
  );
}

export default Login;
