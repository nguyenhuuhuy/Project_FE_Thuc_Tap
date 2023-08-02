import React from 'react'
import { useNavigate, NavLink, Link } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="bg-light text-center text-white">
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Twitter */}
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
              target="_blank"
              to={"https://twitter.com/HuyNguy84659301"}
            >
              <i className="fab fa-twitter" />
            </Link>
            {/* Instagram */}
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
              target="_blank"
              to={"https://www.instagram.com/huy.cb9/"}
            >
              <i className="fab fa-instagram" />
            </Link>
            {/* Github */}
            <Link
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
              target="_blank"
              to={"https://github.com/nguyenhuuhuy/Project_FE_Thuc_Tap"}
            >
              <i className="fab fa-github" />
            </Link>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}
      </footer>
    </>
  );
}

export default Footer