import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from './Auth';
import { useEffect } from 'react';

const ResponsiveDrawer:React.FC=()=>{
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const user=useAuth();
  const navigate=useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(()=>
  {
    if(user?.users!==undefined)
    {
      localStorage.setItem("username",user.users)
    }
  },[user?.users])
  const loggedData=localStorage.getItem('username');
  const handleLogin=()=>
  {
     if(loggedData!==null)
     {
       navigate("/list")
     }
     else
     navigate("/login");
  }
  const removeLogin=()=>
  {
     localStorage.removeItem('username');
  }
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={handleLogin}>
                <ListItemIcon>
                <ArrowForwardIosOutlinedIcon/>
              </ListItemIcon>  
              <ListItemText primary="Menu Items" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );
  return (
    <Box  sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Food Court
          </Typography>
          {
            loggedData!==null?( <Link to="/">
              <Button color="inherit"  style={{ color: 'white' }} onClick={()=>{removeLogin();user?.logout()}}>Logout</Button>
              </Link>):( <Link to="/login">
          <Button color="inherit"  style={{ color: 'white' }}>Login</Button>
          </Link>)
          }
        </Toolbar>
      </AppBar>
      <Box
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet/>
    </Box>
  );
}
export default ResponsiveDrawer;