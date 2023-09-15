// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { useAuth } from './Auth';
// import { useEffect } from 'react';

// const ResponsiveDrawer:React.FC=()=>{
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const user=useAuth();
//   const navigate=useNavigate();
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   useEffect(()=>
//   {
//     if(user?.users!==undefined)
//     {
//       localStorage.setItem("username",user.users)
//     }
//   },[user?.users])
//   const loggedData=localStorage.getItem('username');
//   const handleLogin=()=>
//   {
//      if(loggedData!==null)
//      {
//        navigate("/main/list")
//      }
//      else
//      navigate("/");
//   }
//   const removeLogin=()=>
//   {
//      localStorage.removeItem('username');
//   }
//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//           <ListItem  disablePadding>
//             <ListItemButton onClick={handleLogin}>
//                 <ListItemIcon>
//                 <ArrowForwardIosOutlinedIcon/>
//               </ListItemIcon>  
//               <ListItemText primary="Menu Items" />
//             </ListItemButton>
//           </ListItem>
//       </List>
//     </div>
//   );
//   return (
//     <Box  sx={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             Food Court
//           </Typography>
//           {
//             loggedData!==null?( <Link to="/main">
//               <Button color="inherit"  style={{ color: 'white' }} onClick={()=>{removeLogin();user?.logout()}}>Logout</Button>
//               </Link>):( <Link to="/">
//           <Button color="inherit"  style={{ color: 'white' }}>Login</Button>
//           </Link>)
//           }
//         </Toolbar>
//       </AppBar>
//       <Box
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Outlet/>
//     </Box>
//   );
// }
// export default ResponsiveDrawer;

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { useEffect } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import React from 'react';
import { Logout } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';

const DrawerList = () => {
  const navigate = useNavigate();
  const user = useAuth();
  useEffect(() => {
    if (user?.users !== undefined) {
      localStorage.setItem("username", user.users);
    }
  }, [user?.users])
  const loggedIn = localStorage.getItem('username');
  const handleItems = (FId: number) => {
    if (loggedIn !== undefined) {
      if (FId === 1)
        navigate("/main/list");
      if (FId === 2)
        navigate("/main/user");
    }
    else
      navigate("/")
  }
  const removeLogin = () => {
    localStorage.removeItem('username');
    navigate("/")
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: `calc(${642} - ${240}px)` }}
      >
        <Toolbar>
          <Typography noWrap component="div" sx={{ flexGrow: 1 }}>
            <div className='HeaderLogo'>
              <FastfoodIcon style={{ color: 'white',marginRight:'5px',width:'75px',height:'7.5vh' }} />
              <div >
                <div>    
                  Foreign
                </div>
                <div>
                  FoodCourt
                </div>
              </div>
            </div>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
           loggedIn?( <MenuItem onClick={removeLogin}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>):( <MenuItem onClick={()=>navigate("/")}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          LogIn
        </MenuItem>)
        }
      </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleItems(1)}>
              <ListItemIcon>
                <MenuBookOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Menu Items" />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleItems(2)}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
}
export default DrawerList;