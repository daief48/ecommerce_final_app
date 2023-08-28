import React from "react";
import { Link } from "react-router-dom";
import "./../cafe.css";
import "./../cafe.js"
const Footer = () => {
  const image = () => {
    var mypic = document.querySelector("#img1");

function image() {
    mypic.src = "images/Daief.jpg";
    mypic.classList.add("me");

    mypic.style.display = (mypic.style.display === 'none') ? 'block' : 'none';
    toggleWithDelay("#meh1", 2000);
}

function toggleWithDelay(selector, delay) {
    var element = document.querySelector(selector);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        setTimeout(function() {
            element.style.display = 'none';
        }, delay);
    }
}

  }
  return (
   <>
<div>
  <h1 className="text-center icon">
    <i className="fab fa-jedi-order fa-3x" />
  </h1>
  <div className="container-fluid">
    <div className="footer">
      <img src="/major.png" className="img-fluid rrrri d-block m-auto mt-4" alt height id="img1" />
      <center>

      </center>
      <div class="footer-basic">
        <footer>
            <div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>
            <ul class="list-inline">
                <li class="list-inline-item"><Link to="/">Home</Link></li>
                <li class="list-inline-item"><Link to="/contact">Contact</Link></li>
                <li class="list-inline-item"><Link to="/about">About</Link></li>
                <li class="list-inline-item"><Link to="/policy">Privacy Policy</Link></li>
            </ul>
            <p class="copyright">Company Name Major © 2023</p>
        </footer>
    </div>

    </div>
  </div>
 
</div>

 

   </>
  );
};

export default Footer;