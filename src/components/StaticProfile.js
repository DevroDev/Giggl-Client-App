import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'

import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HttpIcon from '@material-ui/icons/Http';
import ScheduleIcon from '@material-ui/icons/Schedule';

const styles=(theme)=>({
    paper:{
        padding:20
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
        margin:20
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
            margin:20
        }
    },
    badge:{
        position:'absolute',
        padding:20
    }
});

const StaticProfile = (props) =>{
    const {
        classes,
        profile:{
            handle,createdAt,imageUrl,bio,website,location,relation,badge
        }
    }=props;
    return(
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className={classes.badge}>
                        <Fab variant="extended" size="small" color="secondary">
                            <Typography variant="body3">{badge}</Typography>
                        </Fab>
                    </div>
                    <div className={classes.cover}>
                        <img src="https://wallpapercave.com/wp/wp3783845.jpg" alt="coverPhoto" className="cover-image"/>
                    </div>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
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
                                <PersonPinCircleIcon color="secondary"/> <span style={{paddingLeft:10}}>{location}</span>
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
                        <ScheduleIcon color="secondary"/>{' '}
                        <span style={{paddingLeft:10}}>Joined {dayjs(createdAt).format('MMM YYY')}</span>
                    </div>
                </div>
        </Paper>
    )
}

StaticProfile.propTypes={
    profile:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);