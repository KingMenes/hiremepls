import './Header.css'
import logo from '../../assets/hiremepls_logo_white.svg'
import squares from '../../assets/squares.svg'
import {motion} from 'framer-motion'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <section className="header">
          <div className='header-svg'>
              <img src={squares} alt="" />
          </div>
          <div className='header-main'>
              <img className='logo' src={logo} alt="" />
              <hr />
              <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quas minima maxime nobis velit dignissimos quibusdam.</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde rerum aut tenetur, commodi, voluptas pariatur totam ut fugiat, suscipit dolores exercitationem molestias? Vel sapiente quas labore delectus maxime distinctio.</p>
              <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              ><NavLink to='/questions' className='navlink'>
                      Explore Questions
              </NavLink>
                  </motion.button>
          </div>
          <div className='header-svg'>
              <img className='mirror' src={squares} alt="" />
          </div>
    </section>
  )
}

export default Header