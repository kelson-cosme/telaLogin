import "../Pages/Login.css"

import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import user from "../assets/user.png"
import senha from "../assets/senha.png"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_ID,
  storageBucket: import.meta.env.VITE_STORAGE,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
    
    const [verificador, setVerificador] = useState("")

    // Entrar
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setVerificador(true)
    } catch (error) {
      setMessage("Credenciais Incorretas");
    }
  };


    // Sair
    function sair(){
        signOut(auth).then(() => {
            
            console.log("Sign-out successful")
            setVerificador(false)
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    


  return (
    <div id="login" >
      <form   style={{ transform: verificador == false ? "translateX(0)" : "translateX(100%)", opacity: verificador == false ? "1" : "0"}} className="dados" onSubmit={handleLogin}>
      <h1>Login</h1>
        
        <div className="dadosInput">
            <div className="icones">
                <img src={user} alt="" />
            </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        
        <div className="dadosInput">
            <div className="icones">
                <img src={senha} alt="" />
            </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>

        <div className="areaAdmin" style={{ display: verificador == false ? "none" : "block"}} > 

            <h1>Voce logou</h1>
            <h1>Voce logou</h1>
            <h1>Voce logou</h1>
            <h1>Voce logou</h1>

            <h1>Voce logou</h1>
            
            <button onSubmit={handleLogin} onClick={sair}>Deslogar</button>

        </div>

    </div>
  );
}

export default App;