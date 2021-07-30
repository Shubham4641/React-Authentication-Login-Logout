import classes from './ProfileForm.module.css';
import {useRef, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../../store/auth-context';
const ProfileForm = () => {

    const newpasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const submitHandler = event => {
      event.preventDefault();

      const enteredNewPassowrd = newpasswordInputRef.current.value;

      //add validation

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3T2NAlMOsHcIFr5jNr3adGIqOotwfedU', {
        method:'POST',
        body:JSON.stringify({
          idToken: authCtx.token,
          password:enteredNewPassowrd,
          returnSecureToken:false,

        }),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization' :'Bearer abc'
        }
      }).then((res) => {
        history.replace('/');
        //assumption: always successful


      });
    };


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newpasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
