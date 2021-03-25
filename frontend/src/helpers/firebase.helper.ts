import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

interface FirebaseConfigs {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export class FirebaseHelper {
  private static _instance: FirebaseHelper

  public static get Instance(): FirebaseHelper {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this())
  }

  private _auth: firebase.auth.Auth

  public get auth(): firebase.auth.Auth {
    return this._auth
  }

  private _firebase: firebase.app.App

  public get firebase(): firebase.app.App {
    return this._firebase
  }

  public constructor() {
    const firebaseConfig: FirebaseConfigs = {
      apiKey: 'AIzaSyC21S5mRNneDH1X_ZVFRT6b5Hl4ztAt8Go',
      authDomain: 'desafio-mestres-da-web.firebaseapp.com',
      projectId: 'desafio-mestres-da-web',
      storageBucket: 'desafio-mestres-da-web.appspot.com',
      messagingSenderId: '240390857704',
      appId: '1:240390857704:web:eac8ffb43e7587d74d3a5d',
    }

    // Initialize Firebase
    this._firebase = firebase.initializeApp(firebaseConfig)
    // firebase.analytics()
    this._auth = firebase.auth()
  }
}
