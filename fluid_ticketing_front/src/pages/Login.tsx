import { FormEvent, useState } from "react";
import backArrow from '../assets/back_arrow.svg';
import { Link, useNavigate } from "react-router-dom";
import { login as setAuth } from "../store/reducers/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const [loggingIn, setLoggingIn] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function filterPhoneNumber(phoneNumberInput: string) {
        const newPhoneNumber = phoneNumberInput.replace(/\D/g, '');
        setPhoneNumber(newPhoneNumber.slice(0, 10));
    }

    function login(event: FormEvent) {
        event.preventDefault();
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                switch (response.status) {
                    case 401:
                        throw new Error('Invalid email or password.');
                    default:
                        throw new Error('An error occurred while logging in.');
                }
            })
            .then(data => {
                dispatch(setAuth({
                    user: data.name,
                    token: data.token,
                    refreshToken: data.access_token,
                }));
                navigate('/');
            })
            .catch(error => {
                alert(error.message);
            });
    }

    function signUp(event: FormEvent) {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, phone_number: phoneNumber })
        })
            .then(async response => {
                if (response.ok) {
                    return response.json();
                }
                switch (response.status) {
                    case 400:
                        throw new Error(await response.text());
                    case 409:
                        throw new Error('An account with that email already exists.');
                    default:
                        throw new Error('An error occurred while signing up.');
                }
            })
            .then(data => {
                dispatch(setAuth({
                    user: data.name,
                    token: data.token,
                    refreshToken: data.access_token,
                }));
                navigate('/');
            })
            .catch(error => {
                alert(error.message);
            });
    }

    function swapForms(isLoggingIn: boolean) {
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setConfirmPassword('');
        setLoggingIn(isLoggingIn);
    }

    return (
        <>
            <Link to="/" className="absolute top-10 left-10 flex flex-row items-center gap-2 hover:scale-125 transition-transform duration-100">
                <img src={backArrow} alt="Back Arrow" className="w-10 h-10 dark:invert" />
                Back
            </Link>
            {
                loggingIn ?
                    (
                        <div className="h-full flex justify-center items-center bg-gradient-to-b from-secondary-light dark:from-secondary-dark30 dark:to-background-dark to-background-light">
                            <form method="post" onSubmit={(e) => login(e)}
                                className="p-10 pt-5 border-2 border-secondary-light dark:border-secondary-dark shadow-accent-light shadow-2xl rounded-2xl grid grid-cols-2 gap-10"
                            >
                                <h1 className="col-span-2 text-3xl font-bold text-center">Login</h1>
                                <input type="text" placeholder="Email" className="p-3 rounded-xl border-2 border-accent-light dark:border-0 text-text-light" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Password" className="p-3 border-2 border-accent-light dark:border-0 rounded-xl text-text-light" value={password} onChange={(e) => setPassword(e.target.value)} />

                                <button className="col-span-2 bg-accent-light dark:bg-accent-dark rounded-2xl p-3 text-center text-2xl font-bold">Login</button>
                                <p>Already have an account? <button className="bg-none text-accent-light dark:text-accent-dark" onClick={() => swapForms(false)}>Sign In</button></p>
                            </form>
                        </div>
                    )
                    : (
                        <div className="h-full flex justify-center items-center bg-gradient-to-b from-secondary-light dark:from-secondary-dark30 dark:to-background-dark to-background-light">
                            <form method="post" onSubmit={(e) => signUp(e)}
                                className="p-10 pt-5 border-2 border-secondary-light dark:border-secondary-dark shadow-accent-light shadow-2xl rounded-2xl grid grid-cols-2 gap-10"
                            >
                                <h1 className="col-span-2 text-3xl font-bold text-center">Sign Up</h1>
                                <input type="text" className="p-3 col-span-2 rounded-xl border-2 border-accent-light dark:border-0 text-text-light" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="text" placeholder="Email" className="p-3 rounded-xl border-2 border-accent-light dark:border-0 text-text-light" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder="Phone Number" className="p-3 rounded-xl border-2 border-accent-light dark:border-0 text-text-light" value={phoneNumber} onChange={(e) => filterPhoneNumber(e.target.value)} />
                                <input type="password" placeholder="Password" className="p-3 rounded-xl border-2 border-accent-light dark:border-0 text-text-light" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="password" placeholder="Confirm Password" className="p-3 rounded-xl border-2 border-accent-light dark:border-0 text-text-light" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <button className="col-span-2 bg-accent-light dark:bg-accent-dark rounded-2xl p-3 text-center text-2xl font-bold">Sign Up</button>
                                <p>Already have an account? <button className="bg-none text-accent-light dark:text-accent-dark" onClick={() => swapForms(true)}>Login</button></p>
                            </form>
                        </div>
                    )
            }
        </>
    )
}