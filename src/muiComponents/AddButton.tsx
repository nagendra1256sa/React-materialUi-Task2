import { AddCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

const AddButton = () => {
  return (
    <div className='styling'>
    <Link to="/main/list/add">
      <IconButton >
        <AddCircle style={{color: '#F5343e',width: '64px',height: '7.5vh'}} />
      </IconButton>
    </Link>
  </div>
  )
}

export default AddButton