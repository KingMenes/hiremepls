import "./Header.css";
import logo from "../../assets/hiremepls_logo_white.svg";
import squares from "../../assets/squares.svg";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import SectionCard from "../SectionCard/SectionCard";

function Header() {
  const navigate = useNavigate()
  return (
    <section className="header">
      <div className="header-svg">
        <img src={squares} alt="" />
      </div>
      <div className="header-main">
        <img className="logo" src={logo} alt="" />
        <hr />
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quas minima maxime nobis velit dignissimos quibusdam.
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde
          rerum aut tenetur, commodi, voluptas pariatur totam ut fugiat,
          suscipit dolores exercitationem molestias? Vel sapiente quas labore
          delectus maxime distinctio.
        </p>
        <motion.button className="cursorAdd" onClick={() => {
          navigate("/questions")
        }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {/* <NavLink to="/questions" className="navlink">
            Explore Questions
          </NavLink> */}
          Explore Questions
        </motion.button>
      </div>
      <div className="header-svg">
        <img className="mirror" src={squares} alt="" />
        {/* <div className='square sz-128'></div>
                <div className='square'></div>
                <div className='square'></div>
                <div className='square'></div>
                <div className='square'></div>
                <div className='square'></div> */}
      </div>

      <div class="custom-shape-divider-bottom-1670716559">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default Header;
