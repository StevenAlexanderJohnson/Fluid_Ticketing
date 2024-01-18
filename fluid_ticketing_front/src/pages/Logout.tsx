import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCompany } from "../store/reducers/companySlice";

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const delay = (ms: number) => new Promise( resolve => setTimeout(resolve, ms));
    useEffect(() => {
        async function clearAuth() {
            dispatch(logout());
            dispatch(clearCompany());
            await delay(2000);
            navigate('/');
            window.location.reload();
        }

        clearAuth();
    },[]);
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}