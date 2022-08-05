import React from 'react'

const Footer = ({length} : {length: number}) => {
    return (
        <footer className="footer">
            <p>Your lists has {length} {length === 1 ? "item" : "items"}</p>
        </footer>
    )
}

export default Footer

