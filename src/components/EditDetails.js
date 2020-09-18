import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton'

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit'

const styles=(theme)=>({
      palette:{
  primary:{
    light:'#33c9dc',
    main:"#00bcd4",
    dark:'#008394',
    contrastText:'#fff'
  },
  secondary:{
    light:'#ff6333',
    main:"#ff3d00",
    dark:'#b22a00',
    contrastText:'#fff'
  }
},
  typography:{
    userNextVariants:true
  },
  button:{
      float:'right'
  }
})

class EditDetails extends Component {
    state={
        bio:'',
        website:'',
        location:'',
        relation:'',
        open:false
    };
    mapUserDetailsToState=(credentials)=>{
        this.setState({
            bio:credentials.bio?credentials.bio:'',
            website:credentials.website?credentials.website:'',
            location:credentials.location?credentials.location:'',
            relation:credentials.relation?credentials.relation:'',
        })
    }
    handleOpen=()=>{
        this.setState({open:true})
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose=()=>{
        this.setState({open:false})
    }
    componentDidMount(){
        const {credentials}=this.props;
        this.mapUserDetailsToState(credentials);
    }
    onChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit=()=>{
        const userDetails={
            bio:this.state.bio,
            website:this.state.website,
            location:this.state.location,
            relation:this.state.relation,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    render() {
        const { classes } =this.props;
        return (
            <Fragment>
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button} >
                    <EditIcon color="secondary"/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                placeholder="Describe who you are"
                                className={classes.testField}
                                value={this.state.bio}
                                onChange={this.onChange}
                                fullWidth
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your Web site"
                                className={classes.testField}
                                value={this.state.website}
                                onChange={this.onChange}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="where do you live"
                                className={classes.testField}
                                value={this.state.location}
                                onChange={this.onChange}
                                fullWidth
                            />
                            <TextField
                                name="relation"
                                type="text"
                                label="Relationship Status"
                                placeholder="Are you single Or not?"
                                className={classes.testField}
                                value={this.state.relation}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">Cancle</Button>
                        <Button onClick={this.handleSubmit} color="secondary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes={
    editUserDetails:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    credentials:state.user.credentials
})

export default connect(mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails))
