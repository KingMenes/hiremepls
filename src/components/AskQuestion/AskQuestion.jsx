import './AskQuestion.css'
import {HiOutlineChatBubbleLeftEllipsis} from 'react-icons/hi2'

function AskQuestion({ sessionUser, setSessionUser }) {

    

    return (
        
        <div className='askquestion'>
            <div>
                <img src="https://thispersondoesnotexist.com/image" alt="" />
                <div className='question-input'>
                    <HiOutlineChatBubbleLeftEllipsis className='icon' />
                    <input type="text" placeholder='Ask a Question' />
                </div>
          
            </div>
          
        </div>
  )
}

export default AskQuestion