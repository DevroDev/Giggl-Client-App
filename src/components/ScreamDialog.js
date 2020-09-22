import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import LikeButton from "./LikeButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
//Icon
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../redux/actions/dataActions";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0,1)",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    objectFit: "cover",
  },
  DialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "85%",
  },
  expandButton: {
    position: "absolute",
    left: "88%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  bodyText: {
    textAlign: "justify",
  },
};

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress color="secondary" size={200} />
      </div>
    ) : (
      <Grid container spacing={1}>
        <Grid item lg={4} sm={4}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item lg={8} sm={8}>
          <Typography
            component={Link}
            color="secondary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1" className={classes.bodyText}>
            {body}
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="secondary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Gig"
          tipClassName={classes.expandButton}
        >
          <ZoomOutMapIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
