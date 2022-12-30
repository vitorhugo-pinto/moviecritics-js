import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import styles from "./Signup.module.css";

const tstapi = 'https://tstapi.ffcloud.com.br/';

export function Signup() {
  const navigate = useNavigate();

  const [nameInputValue, setNameInputValue] = useState("");

  const [emailInputValue, setEmailInputValue] = useState("");

  const [passwordInputValue, setPasswordInputValue] = useState("");

  function setNameValidation() {
    event.target.setCustomValidity("Name input is empty!");
  }

  function handleNameInputChange() {
    event.target.setCustomValidity("");

    setNameInputValue(event.target.value);
  }

  function setEmailValidation() {
    console.log(emailInputValue.length)
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

  function handleSignup() {
    event.preventDefault();
    const user = {
      name: nameInputValue,
      email: emailInputValue,
      password: passwordInputValue
    }
    fetchSignup(user);
  }

  async function fetchSignup (user) {
    const res = await fetch(tstapi + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      if(alert('User created successfully')){
        navigate('/login');
      }
    }
    else {
      alert('User not created')
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <div className={styles.login}>
            <form onSubmit={handleSignup} className={styles.loginForm}>
              <p>
                <strong>Create new account</strong>
              </p>

              <input
                name="Name"
                type="text"
                placeholder="Type your name"
                value={nameInputValue}
                onChange={handleNameInputChange}
                onInvalid={setNameValidation}
                required
              />

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
                <button
                  type="submit"
                  // disabled={isCommentTextAreaValueEmpty}
                >
                  Sign in
                </button>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
