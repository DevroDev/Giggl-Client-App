import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../images/logo.png';
import { connect } from 'react-redux';
import PostScream from './PostScream';
import Notifications from './Notifications'
import MyButton from '../util/MyButton';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DehazeIcon from '@material-ui/icons/Dehaze';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme) => ({
    appbarStyle:{
      
    },
    logoContainer:{
        marginRight:20,
        float:'left'
    },
    logo:{
        width:120,
        height:60,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
}));

function Navbar({authenticated}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem>
            <Link to="/">
                <MyButton className="navBar" tip="Home">
                    <HomeIcon color="secondary"/>
                </MyButton>
            </Link>
        </MenuItem>
      <MenuItem>
        <PostScream/>
      </MenuItem>
      <MenuItem>
          <Link to="/message">
              <MyButton className="navBar" tip="Message">
                <ForumIcon color="secondary"/>
              </MyButton>
          </Link>
        </MenuItem>
      <MenuItem>
        <Notifications/>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="secondary"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
        {authenticated ? (
        <Fragment>
        <Link to="/">
            <div className={classes.logoContainer}>
                <img src={AppIcon} className={classes.logo} alt="logo"/>
            </div>
        </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/">
                <MyButton className="navBar" tip="Home">
                    <HomeIcon color="secondary"/>
                </MyButton>
            </Link>
            <PostScream className="navBar"/>
              <Link to="/message">
                  <MyButton className="navBar" tip="Message">
                    <ForumIcon color="secondary"/>
                  </MyButton>
              </Link>
            <Notifications/>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <DehazeIcon />
            </IconButton>
          </div>
          </Fragment>
        ) : (
            <Fragment>                        
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Fragment>
        )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps=(state)=>({
    authenticated:state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);