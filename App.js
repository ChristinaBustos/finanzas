import Navigation from './config/navigation/Navigation';
import React,{useState,useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import NavigationLogged from './config/navigation/NavigationLogged';
import Loading from './kernel/components/Loading';
import {app} from './config/utils/firebase'

export default function App() {
  const [session, setSession] = useState(null)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth,(credencial)=>{
        !credencial ? setSession(false) : setSession(true)
    })
}, [])
  if (session == null) return <Loading show={true} text='Cargando' />
  return session ? (<NavigationLogged setReload={setReload} />) : (<Navigation />)
}

