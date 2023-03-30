// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    getAuth,
    GithubAuthProvider,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    linkWithRedirect,
    signOut,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDhQPbU8fZFPQ1OTFLrAdD0tJfofa0Hfyk',
    authDomain: 'booking-care-app.firebaseapp.com',
    projectId: 'booking-care-app',
    storageBucket: 'booking-care-app.appspot.com',
    messagingSenderId: '366277880177',
    appId: '1:366277880177:web:bb4b1fef3607871254aed0',
    measurementId: 'G-991DJ5QX55',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
const analytics = getAnalytics(app);
//
export const auth = getAuth(app);

export const onAuthStateChangedUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};
//
const provider = {
    GOOGLE: new GoogleAuthProvider(),
    FACEBOOK: new FacebookAuthProvider(),
    GITHUB: new GithubAuthProvider(),
};
// GOOGLE
export const logginWithGoogleFirebase = () =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await signInWithPopup(auth, provider.GOOGLE);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (result?.user) {
                const { displayName, email, photoURL } = result.user;
                resolve({
                    firstName: displayName,
                    email,
                    roleId: 'R3',
                    image: photoURL,
                });
            } else {
                resolve(false);
            }
        } catch (error) {
            return reject(error);
        }
    });
// FACEBOOK
export const logginWithFaceBookFirebase = () =>
    new Promise(async (resolve, reject) => {
        try {
            const result = await signInWithPopup(auth, provider.FACEBOOK);
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            resolve(resolve ? result : false);
        } catch (error) {
            reject(error);
        }
    });
// PHONE NUMBER
export function onCaptchVerify(phoneNumber) {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            {
                size: 'invisible',
                callback: (response) => {
                    signUpWithPhoneNumber(phoneNumber);
                },
                'callback-expried': () => {},
            },
            auth,
        );
    }

    //window.recaptchaVerifier.render();
}
export function signUpWithPhoneNumber(phoneNumber) {
    return new Promise(async (resolve, reject) => {
        try {
            onCaptchVerify(phoneNumber);
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, '+' + phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    resolve(confirmationResult ? confirmationResult : new Error('Failed to Verify Code'));
                })
                .catch((error) => {
                    if (window.recaptchaWidgetId) {
                        grecaptcha.reset(window.recaptchaWidgetId);
                    } else {
                        window.recaptchaVerifier.render().then(function (widgetId) {
                            grecaptcha.reset(widgetId);
                        });
                    }
                    console.log(error);
                    resolve(false);
                });
        } catch (error) {
            reject(error);
        }
    });
}
export async function verifyOTP(otp) {
    try {
        confirmationResult
            .confirm(otp)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                // ...
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
    } catch (error) {
        return Promise.reject(error);
    }
}
export const SignOutSocial = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            signOut(auth)
                .then((result) => {
                    resolve(result);
                    // Sign-out successful.
                })
                .catch((error) => {
                    // An error happened.
                    resolve(new Error(error));
                });
        } catch (error) {
            reject(error);
        }
    });
};
// DEFAULT
export default app;
