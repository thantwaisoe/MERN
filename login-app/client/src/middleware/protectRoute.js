import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';

const AuthorizeUser = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token) return <Navigate to={'/'} replace={true}/>
    return children
};
const PasswordProtect = ({children}) => {
    const {username} = useAuthStore(state => state.auth)
    if(!username) return <Navigate to={'/'} replace={true}/>
    return children
};

export { AuthorizeUser, PasswordProtect};