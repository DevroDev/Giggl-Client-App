import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { postScream,clearErrors } from '../redux/actions/dataActions';

const styles=(theme)=>({
    palette:{
  primary:{
    light:'#78909c',
    main:"#9575cd",
    dark:'#0097a7',
    contrastText:'#ffffff'
  },
  secondary:{
    light:'#ff6333',
    main:"#ff3d00",
    dark:'#b22a00',
    contrastText:'#000000'
  }
},
  typography:{
    userNextVariants:true
  },
    submitButton:{
        position:'relative',
        marginTop:'5%',
        float:'right'
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'90%',
        top:'5%'
    }
})

class PostScream extends Component{
    state={
        open:false,
        body:'',
        errors:{}           
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            })
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading ){
            this.setState({ body:'',open:false,errors:{} });
        }
    }
    handleOpen=()=>{
        this.setState({ open:true })
    }
    handleClose=()=>{
        this.props.clearErrors();
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.postScream({ body:this.state.body });
    }
    render(){
        const { errors }=this.state;
        const { classes, UI:{ loading }}=this.props;
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Gig">
                    <AddCircleOutlineOutlinedIcon color="secondary"/>
                </MyButton>
                <Dialog
                open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new Gig</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="GIG"
                                multiline
                                rows="3"
                                placeholder="Post A Gig"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.TextField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Post
                                {loading && (
                                     <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes={
    clearErrors:PropTypes.func.isRequired,
    postScream:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired
};

const mapStateToProps=(state)=>({
    UI:state.UI
})

export default connect(mapStateToProps,{ postScream,clearErrors })(withStyles(styles)(PostScream))