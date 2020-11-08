import React, {FormEvent, FunctionComponent, useState} from 'react';
import {PAGE_URLS, API_URLS} from "./constants";
import axios from 'axios';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Loader } from './Loader';

interface LoginProps extends RouteComponentProps<any> {}

const Login: FunctionComponent<LoginProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function handleChangeEmail(event: FormEvent<HTMLInputElement>): void {
        setEmail(event.currentTarget.value);
    }

    function handleChangePassword(event: FormEvent<HTMLInputElement>): void {
        setPassword(event.currentTarget.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setIsLoading(true);
        //TODO input validators
        const loginData: FormData = new FormData();
        loginData.append('email', email);
        loginData.append('password', password);

        axios.post(API_URLS.LOGIN, loginData).then(response => {
            localStorage.setItem('token', response.data.access_token);
            history.push(PAGE_URLS.MAIN_PAGE);
            setIsLoading(false);    
        }).catch(error => {
            setIsLoading(false);
            alert(error);
        })
    }

    return (
        isLoading 
        ? 
            <Loader />
        :
            <div className="alignMiddle">
                <form id='nameForm' onSubmit={handleSubmit}><br/><br/>
                    <label className='labelForm'>
                        Email:<br/>
                        <input className="form-control" name="value" type="text" value={email}
                            id='formInput' onChange={handleChangeEmail}/>
                    </label><br/>

                    <label className='labelForm'>
                        Hasło:<br/>
                        <input className="form-control" name="value" type="password" value={password}
                            id='formInput' onChange={handleChangePassword}/>
                    </label><br/>
                    <input style={{background: 'green'}} className="btn btn-primary" type="submit" value="Zaloguj się"/>
                    <br/>
                </form><br/>
                <button className="btn btn-primary" onClick={() => history.push(PAGE_URLS.REGISTER)}>
                        Zajerestruj się
                </button>
            </div>
    );
}

export default withRouter(Login);