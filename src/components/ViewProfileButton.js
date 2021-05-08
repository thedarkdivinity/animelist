import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory} from 'react-router-dom'
const ViewProfileButton = () => {
    const history=useHistory();
    return (
        <Button  variant="contained" color="secondary" onClick={()=>history.push('/profile')}>View Profile</Button>
    )
}

export default ViewProfileButton
