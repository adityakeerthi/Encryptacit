import React from "react";

import {Alert} from 'antd'

const SignedOut = () => {
    return (
        <div className="signed-out-div">
            <img className="signed-out-logo" src="https://firebasestorage.googleapis.com/v0/b/social-media-59b42.appspot.com/o/logo-removebg-preview%20(1).png?alt=media&token=15538ad9-b431-4705-8136-79d6b2cc4413"></img>
            <Alert type="warning" message="Please log in with Metamask to continue..."/>
        
        </div>
    )
}

export default SignedOut