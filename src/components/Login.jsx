import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import styles from "./Login.module.css";

const tstapi = 'https://tstapi.ffcloud.com.br/';

export function Login() {
  const navigate = useNavigate();

  const [emailInputValue, setEmailInputValue] = useState("");

  const [passwordInputValue, setPasswordInputValue] = useState("");

  function setEmailValidation() {
    if (emailInputValue.length === 0) {
      event.target.setCustomValidity("Email input is empty!");
    } else {
      event.target.setCustomValidity("Email invalid!");
    }
  }

  function handleEmailInputChange() {
    event.target.setCustomValidity("");

    setEmailInputValue(event.target.value);
  }

  function setPasswordValidation() {
    event.target.setCustomValidity("Email input is empty!");
  }

  function handlePasswordInputChange() {
    event.target.setCustomValidity("");

    setPasswordInputValue(event.target.value);
  }

  async function handleLogin() {
    event.preventDefault();
    const user = {
      email: emailInputValue,
      password: passwordInputValue
    }
    await fetchLogin(user);
  }

  async function fetchLogin (user) {
    const res = await fetch(tstapi + 'auth/signin', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      const json = await res.json();
      // setToken(json.user.token);
      localStorage.setItem('token', json.user.token);
      navigate('/home');
    } else {
      alert("Email or password invalid!");
    }
  }

  const disableLoginOnEmptyInputs =
    emailInputValue.length === 0 || passwordInputValue.length === 0;

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <div className={styles.login}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <p>
                <strong>Log into the system</strong>
              </p>

              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                value={emailInputValue}
                onChange={handleEmailInputChange}
                onInvalid={setEmailValidation}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Type your password"
                value={passwordInputValue}
                onChange={handlePasswordInputChange}
                onInvalid={setPasswordValidation}
                required
              />

              <footer>
                <button type="submit" disabled={disableLoginOnEmptyInputs}>
                  Login
                </button>
                <p>
                  <strong>
                    <a href="/signup">Click here to sign in</a>
                  </strong>
                </p>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
