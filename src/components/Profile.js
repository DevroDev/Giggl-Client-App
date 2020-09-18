import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import  {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../util/MyButton';
import ProfileSkeleton from '../components/ProfileSkeleton'

//Mui
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';
//Icon
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HttpIcon from '@material-ui/icons/Http';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
//Redux
import { connect } from 'react-redux';
import { logoutUser,uploadImage } from '../redux/actions/userActions';

const styles=(theme)=>({
    paper:{
        padding:20,
    },
    profile:{
        '& .image-wrapper':{
            textAlign:'center',
            position:'relative',
            '& button':{
                position:'absolute',
                top:'75%',
                left:'65%'
            }
        },
    '& .handleName':{
        textAlign:'center',
        margin:15
    },
    '& .cover-image':{
        width:'100%',
        height:250,
        objectFit:'cover',
    },
    '& .profile-image':{
        marginTop:'-30%',
        width:200,
        height:200,
        objectFit:'cover',
        maxWidth:'100%',
        borderRadius:'50%'
    },
    '& .profile-details':{
        textAlign:'left',
        paddingBottom:20,
        paddingLeft:15,
        '& span, svg':{
            verticalAlign:'middle'
        },
        '& a':{
            color:'red'
        }
    },
    '& hr':{
        border:'none',
        margin:'0 0 10px 0'
    },
    '& svg.button':{
        '&:hover':{
            cursor:'pointer'
        }
    }
    },
    button:{
        textAlign:'center',
        '& a':{
            margin:10
        }
    },
    badge:{
        position:'absolute',
        padding:20
    }
});

export class Profile extends Component {
    handleImageChange=(event)=>{
        const image=event.target.files[0];
        const formData=new FormData();
        formData.append('image',image,image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture=()=>{
        const fileInput=document.getElementById('imageInput');
        fileInput.click()
    }
    handleLogout=()=>{
        this.props.logoutUser();
    }
    render() {
        const { classes,user:{ 
            credentials:{handle,createdAt,imageUrl,bio,website,location,relation,badge},
            loading,
            authenticated
        }}=this.props;

        let profileMarkup=!loading ? (authenticated ? ( 
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className={classes.badge}>
                        <Fab variant="extended" size="small" color="secondary">
                            <Typography variant="body2">{badge}</Typography>
                        </Fab>
                    </div>
                    <div className={classes.cover}>
                        <img src="https://wallpapercave.com/wp/wp3783845.jpg" alt="coverPhoto" className="cover-image"/>
                    </div>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                        <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="button">
                            <AddAPhotoIcon color="secondary"/>    
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="handleName">
                        <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
                            {handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                    </div>
                        
                        <div className="profile-details">
                        {location && (
                            <Fragment>
                                <PersonPinCircleIcon color="secondary"/> <span style={{paddingLeft:10}}>Lives in {location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <HttpIcon color="secondary"/>
                                <a style={{paddingLeft:10}} href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        {relation &&(
                            <Fragment>
                                <FavoriteIcon color="secondary"/><span style={{paddingLeft:10}}>{relation}</span>
                                <hr/>
                            </Fragment>
                        )}
                        <WatchLaterIcon color="secondary"/>{' '}
                        <span style={{paddingLeft:10}}>Joined {dayjs(createdAt).format('MMM YYY')}</span>
                    </div>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                        <ExitToAppIcon color="secondary"/>   
                    </MyButton>
                    <EditDetails/>
                </div>
            </Paper>
         ) : (
             <Paper className={classes.paper}>
                 <Typography variant="body2" align="center">
                     No profile found, please login again</Typography>
                     <div className={classes.buttons}>
                         <Button varient="contained" color="primary" component={Link} to='/login'>
                             Login
                         </Button>
                         <Button varient="contained" color="secondary" component={Link} to='/signup'>
                             SignUp
                         </Button>
                     </div>
             </Paper>
         ) ) : (<ProfileSkeleton/>)
        return profileMarkup;
    }
}

const mapStateToProps=(state)=>({
    user:state.user
});

const mapActionsToProps ={ logoutUser,uploadImage };

Profile.propTypes={
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired,
    uploadImage:PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles) (Profile))
