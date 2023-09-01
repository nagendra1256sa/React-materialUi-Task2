import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { Annotation } from '../App';

interface typeCheck{
  item:Annotation[];
}


const DetailCard:React.FC<typeCheck>=({item})=> {
    const {id}=useParams();
    const itemId=id?parseInt(id):NaN;
    const details=item.find((each)=>{
       return each.id===itemId;
    })
    const navigate=useNavigate();
  return (
    <div className='card'>
      <Card sx={{ minWidth: 275 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Details
        </Typography>
        <Typography variant="h6" component="div">
          <span style={{"fontWeight":"bold"}}>Sku:</span> {details?.Sku}
        </Typography>
        <Typography variant='h6'>
        <span style={{"fontWeight":"bold"}}>Name:</span>{details?.Name}
        </Typography>
        <Typography variant="h6">
        <span style={{"fontWeight":"bold"}}>Display Name:</span>{details?.DisplayName}
        </Typography>
        <Typography variant="h6" >
        <span style={{"fontWeight":"bold"}}>Base Price:</span>{details?.BasePrice}
        </Typography>
        <Typography variant="h6">
        <span style={{"fontWeight":"bold"}}>Selling Price:</span>{details?.SellingPrice}
        </Typography>
        <Typography variant="h6">
        <span style={{"fontWeight":"bold"}}>Decription:</span> {details?.Decription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>navigate("/muilist")}>Back to list</Button>
      </CardActions>
    </Card>
    </div>
  );
}
export default DetailCard
