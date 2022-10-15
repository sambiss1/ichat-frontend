import React from 'react'
import "./recentsMessages.css"


const RecentMessageCard = () => {
    return (
        <div className="recent__message--card">
            <div className="recent__message--user__picture">
                <img
                    src="/images/user.png"
                    alt="profile pictur"

                />
            </div>
            <div className="recent__message--user__message">
                <h3>Raghav</h3>
                <p>Dinner ? </p>
            </div>

        </div>
    )
}

const RecentsMessages = () => {

    return (
        <div className="recent__message--main__container">
            <h3>Recent</h3>
            <div className="recent__message--list">
                <RecentMessageCard />
                <RecentMessageCard />
                <RecentMessageCard />
                <RecentMessageCard />
                <RecentMessageCard />
            </div>
        </div>
    )
}

export default RecentsMessages