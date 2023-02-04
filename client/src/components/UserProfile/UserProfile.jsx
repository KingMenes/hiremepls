import './UserProfile.css'
function UserProfile() {
  return (
      <div className='userprofile'>
          <div className='userheader'>
            <img src="https://thispersondoesnotexist.com/image" alt="" />
            <div>
                <span>Username</span>
                <div>
                    <p>Member for X days</p>
                </div>
              </div>
              <div className='stats'></div>
          </div>
      </div>
  )
}

export default UserProfile