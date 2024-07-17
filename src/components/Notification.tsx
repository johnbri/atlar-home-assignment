import React from "react";
import "./Notification.css"

const Notification = ({message}) => {

    const negBalance = "One or more of your accounts currently has a negative balance. Please ensure that the balance of the affected account(s) is increased within 3 days to avoid any potential issues."

    return (
    <div className="notification-wrapper">
        <p>{message === "negBalance" && negBalance}</p>
    </div>
    )
}

export default Notification;
