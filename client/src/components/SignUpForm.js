import React, { useState } from 'react'

function SignUpForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [height, setHeight] = useState("")

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    function handleSubmit(e) {
      e.preventDefault();
      setErrors([]);
      setIsLoading(true);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
          first_name,
          last_name,
          height
        }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
        />
        <label htmlFor="first_name">First Name</label>
        <input
            type="text"
            id="first_name"
            autoComplete="off"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
            type="text"
            id="last_name"
            autoComplete="off"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="height">Height</label>
        <input
            type="text"
            id="height"
            autoComplete="off"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
        />
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
          {/* {errors.map((err) => (
        // <Error key={err}>{err}</Error>
          ))} */}
      </form>
    );
}

export default SignUpForm