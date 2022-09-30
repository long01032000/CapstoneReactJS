import React from 'react'
import { NavLink } from 'react-router-dom'

export default function FooterHome() {
  return (
    <>
      <footer className="bg-light text-center text-lg-start mt-3">
  {/* Grid container */}
  <div className="container p-4">
    {/*Grid row*/}
    <div className="row">
      {/*Grid column*/}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0 mt-2 text-center">
        <h5 className="text-uppercase">Get Help</h5>
        <ul className="list-unstyled mb-0">
          <li>
            <NavLink to="#!" className="text-dark">Home</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Nike</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Adidas</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Contact</NavLink>
          </li>
        </ul>
      </div>
      {/*Grid column*/}
      {/*Grid column*/}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0 mt-2 text-center">
        <h5 className="text-uppercase">Support</h5>
        <ul className="list-unstyled">
        <li>
            <NavLink to="#!" className="text-dark">About</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Contact</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Help</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Phone</NavLink>
          </li>
        </ul>
      </div>
      {/*Grid column*/}
      {/*Grid column*/}
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0 mt-2 text-center">
        <h5 className="text-uppercase">Register</h5>
        <ul className="list-unstyled mb-0">
        <li>
            <NavLink to="#!" className="text-dark">Register</NavLink>
          </li>
          <li>
            <NavLink href="#!" className="text-dark">Login</NavLink>
          </li>
          
        </ul>
      </div>
      {/*Grid column*/}
     
      {/*Grid column*/}
    </div>
    {/*Grid row*/}
  </div>
  {/* Grid container */}
  {/* Copyright */}
  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    © 2022 Cybersoft all rights reserved | Design Theme By:
    <NavLink className="text-dark" href="#">Louis Hoang</NavLink>
  </div>
  {/* Copyright */}
</footer>

    </>
  )
}
