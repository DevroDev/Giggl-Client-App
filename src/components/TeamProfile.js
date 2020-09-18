import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop:20,
    backgroundColor: '#ffffff',
  },
  headerText:{
    margin:10
  },
  inline: {
    display: 'inline',
  },
}));

export default function TeamProfile() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <Typography className={classes.headerText} variant="h6" color="secondary">
        Team Giggle
      </Typography>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="C Gyi" src="https://pmcvariety.files.wordpress.com/2020/06/zach-woods-silicon-valley.jpg?w=1000" />
        </ListItemAvatar>
        <ListItemText
          primary="C Gyi"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Project Development Manager  
              </Typography>
              {' __ Si Thu Htun is incharged for Propose strategic projects in response to any improvements, optimisation'}
            </React.Fragment>
          }
        />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>          
            <Avatar alt="Zig Zag" src="https://i.pinimg.com/originals/d2/ff/1d/d2ff1de967010b45f23482d83dce17b9.jpg"/>
            </ListItemAvatar>
            <ListItemText
            primary="Zig Zag"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    System Engineer
                </Typography>
                {' __ Phone Min Khant is incharged for designing and managing composite systems over their life cycles'}
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider variant="inset" component="li" />     
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Kaung Thain Hka" src="https://www.hollandsentinel.com/storyimage/ZZ/20181115/ENTERTAINMENT/311159923/AR/0/AR-311159923.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary="Kaung Thain Kha"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    UI/UX Designer
                </Typography>
                {" — Htut Zayar Lin is incharged for Gathering and evaluating user requirements, in collaboration with product managers and engineers"}
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt="Devro" src="https://www.trbimg.com/img-55650a13/turbine/la-et-st-join-a-chat-with-silicon-valleys-thomas-middleditch-on-tuesday-20150522" />
            </ListItemAvatar>
            <ListItemText
            primary="Devro"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    Software Engineer
                </Typography>
                {" — Pyae Htet Shein is incharged for Developing information systems by designing, developing, and installing software solutions. "}
                </React.Fragment>
            }
            />
        </ListItem>
    </List>
  );
}