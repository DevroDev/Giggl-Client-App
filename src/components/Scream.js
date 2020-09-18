import React, { Component,Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';
import PropTypes from 'prop-types';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';


import Avatar from '@material-ui/core/Avatar';

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux';

const styles={
    separator:{
        borderBottom:'1px solid #999999',
        margin:'5px 40px'
    },
    card:{
        position:'relative',
        marginBottom:20,
        borderRadius:20
    },
    image:{
        width:60,
        height:60,
        borderRadius:'50%',
    },
    content:{
        marginLeft:10,
        marginRight:10,
        objectFit:'cover'
    },
    bodyText:{
        marginBottom:10,
        textAlign:'justify'
    },
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            scream:{ 
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount 
            },
            user:{
                authenticated,
                credentials:{ handle }
            }
        }=this.props;
        
            
            const deleteButton=authenticated && userHandle === handle ? (
                <DeleteScream screamId={screamId} />
            ) : null
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.image} src={userImage}>
                            
                        </Avatar>
                    }
                    action={
                    <Fragment>
                        {deleteButton}
                    </Fragment>
                    }
                    title={<Typography variant="h6" component={Link} to={`/users/${userHandle}`} color="secondary" className={classes.headerText}>{userHandle}</Typography>}
                    subheader={
                    <Typography variant="body2" color="textSecondary" className={classes.headerText}>{dayjs(createdAt).fromNow()}</Typography>
                }
                    />
                <CardContent className={classes.content}>
                    <Typography className={classes.bodyText} variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="secondary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes={
    user:PropTypes.object.isRequired,
    scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool
}

const mapStateToProps=state=>({
    user:state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Scream));
