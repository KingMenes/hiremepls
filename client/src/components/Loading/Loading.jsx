import loadinggif from '../../assets/Loading_2.gif'
import Backdrop from '../Backdrop/Backdrop'

const Loading = () => {
    return (
        <Backdrop>
            <img src={loadinggif}></img>
        </Backdrop>
    )
}

export default Loading
