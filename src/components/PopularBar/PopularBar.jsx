import './PopularBar.css'
import { AiOutlineFire } from 'react-icons/ai'
import { TiStarburstOutline } from 'react-icons/ti'
import {BsBarChart} from 'react-icons/bs'

function PopularBar() {
  return (
      <div className='popularbar'>
          <ul>
              <li><AiOutlineFire className='icon'/>hot</li>
              <li><TiStarburstOutline className='icon'/>new</li>
              <li><BsBarChart className='icon'/>top</li>
          </ul>
          
    </div>
  )
}

export default PopularBar