import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function ComingEvents() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="180"
          image="https://www.component-creator.com/images/Component-Creator-new-feature.png"
          title="New Feature"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Make Your Rank Up
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Introduction to Giggle's Ranking system.When your rank is up you
            will be given giggle badge.There will be 21 stages of ranks and we
            will inform you how our ranking system works lately.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="medium" color="primary">
          Posting
        </Button>
        <Button variant="contained" size="medium" color="secondary">
          Sharing
        </Button>
      </CardActions>
    </Card>
  );
}
