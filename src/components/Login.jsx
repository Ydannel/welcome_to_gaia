import React from 'react';
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';

const Login = () => {
    return ( 
    <>
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to gaia Planet</h2>

                <div className="login-button google">
                    <GoogleOutlined/> Sing in with google
                </div>
                <br /> <br />

                <div className="login-button google">
                    <FacebookOutlined/> Sing in with facebook
                </div>
            </div>
        </div>
    </> 
    );
}
 
export default Login;