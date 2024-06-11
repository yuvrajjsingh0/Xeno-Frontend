import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { loginWithGoogle } from '../utils/api';
import { errorToast, successToast } from '../utils/common';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {

  const nav = useNavigate();

  if(localStorage.getItem("token") != undefined && localStorage.getItem("token") != '') window.location.replace("/audience");

  const response = async (res: CredentialResponse) => {
    console.log(res);
    loginWithGoogle(res.credential!).then(() => {
      successToast("Login Successful");
      return nav("/audience");
    }).catch(err => {
      console.log(err);
      errorToast("Could not authenticate you");
    })
  };
  const errorMessage = () => {
      console.log("Error");
  };

  return (
    <main className=" pt-16 max-h-screen overflow-auto">
        <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 mb-5">
                  <h1 className="text-center text-3xl font-bold mb-10">Login</h1>
                  <br />
                  <br />
                  <h2 className="text-center text-2xl font-bold mb-10">Login to create and manage your audiences and campaigns</h2>
                  <div className='items-center'>
                    <GoogleLogin size='large' onSuccess={response} onError={errorMessage} />
                  </div>
                </div>
            </div>
        </div>
    </main>
  )
}
