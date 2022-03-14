import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.png';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss'; 
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/Firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');


  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

      history.push('/rooms/new');
  }

  async function handleJoinRoom (event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() == '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Sala não existe.');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Esta sala já foi encerrada.');
      return;
    }
    
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg} alt="Imagem Simbolizando Pessoas Conversando"></img>
        <strong>Crie salas de Q&amp;A ao vivo </strong>
        <p>Tire suas dúvidas em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
        <img src={logoImg} alt="tellmesomething"/>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google"></img>
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Digite o código da sala" onChange={event => setRoomCode(event.target.value)} value={roomCode}/>
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
