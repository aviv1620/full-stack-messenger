import axios, { AxiosError } from 'axios';
import { SignIn } from './templates/SignIn';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/connectionSlice';
import { setUserMe } from '../../redux/contactsSlice';

const UNAUTHORIZED_ERROR = 401

export function Login() {

    const dispatch = useDispatch()

    const navigate = useNavigate()
   
    const demoUsers = [
        { username: 'lazyfish925', password: 'callisto' },
        { username: 'goldenleopard277', password: 'pooky' },
        { username: 'whitecat357', password: 'crusty' },
        { username: 'happyduck556', password: 'ernest' },
        { username: 'goldenwolf841', password: 'mortgage' },
        { username: 'organiccat607', password: 'harlem' },
        { username: 'lazykoala147', password: '12345a' },
        { username: 'smallfish895', password: 'seng' },
        { username: 'greenswan136', password: 'beast1' },
        { username: 'heavygoose267', password: 'gonzales' }
      ]

    const handleSubmit = async (username,password) => {   
        console.log('login btn press')        
        try {

            const data = {
                username:username.trim(),
                password:password.trim()
            }

            const url = `${process.env.REACT_APP_SERVER_URL}/auth/login`  

            const response = await axios.post(url,data)                
            
            const user = response.data.user          

            dispatch(setUserMe(user))

            const token = response.data.accessToken           

            localStorage.setItem("token", token);

            dispatch(setToken(token))

            navigate('/')
            
        } catch (error) { 
            
            if(error instanceof AxiosError){
                if(error.response){
                  //token is invalid or expired. redirect user to login page
                  if(error.response.status === UNAUTHORIZED_ERROR){
                    alert(error.response.data)
                    
                    return
                  }
                } 
                    
                alert('something went wrong please try again later')
              }
            console.error(error)          

        }            
    }

    return SignIn({demoUsers,handleSubmit})
}


