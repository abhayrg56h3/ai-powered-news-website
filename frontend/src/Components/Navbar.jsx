import React from 'react'

export default function Navbar() {
  return (
    <div>
      {/*  logo */}
      <span>TailorPress</span>

      {/*  navigation links */}
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      {/*  user profile */}
      <div>
        <img src="/user.jpg" alt="" className="userProfile" />
        <span>Profile</span>
      </div>

      {/*  search bar */}
      <input type="text" placeholder="Search" />

      {/*  dropdown menu */}
      <div>
        <span>Dropdown</span>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>

      {/*  hamburger menu */}
      <div>
        <span>Menu</span>
      </div>

      {/*  social media icons */}

    </div>
  )
}
