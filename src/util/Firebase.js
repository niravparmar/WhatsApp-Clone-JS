const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "your",
            authDomain: "your",
            databaseURL: "your",
            projectId: "your",
            storageBucket: "your",
            messagingSenderId: "your"
        };

        this.init();
    }

    init() {
        if (!window._initialized) {

            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initialized = true;
        }
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {

        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user, 
                    token
                });
            }).catch(error => {
                f(error);
            });
        });

    }
}
