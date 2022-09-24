import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// css
import '../App.css'


export const NavBar = () => {
    const [user] = useAuthState(auth)

    const handleSignout = async () => {
        alert('Are You Sure')
        await signOut(auth).then(() => {
            console.log('Completed-Signout');
        }).catch((err) => {
            console.log(err);
            console.log('Cant SignOut');
        })
    }


    return (
        <div className='navbar' >
            <div className="links">
                <Link to='/' >Home</Link>
                {user ? <Link to='/createpost' >CreatePost</Link> : <Link to='/login' >Login</Link>}


            </div>
            {
                user ? <div className="user">
                    <p style={{ color: 'white' }} >{user?.displayName}</p>
                    <img src={user?.photoURL || ""} alt="nop" width='20' height='20' />
                    <button onClick={handleSignout} >Sign Out</button>
                </div> : ''
            }
        </div>
    )
}
