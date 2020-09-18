import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Profile from '../components/Profile';
import ComingEvents from '../components/ComingEvents';
import TeamProfile from '../components/TeamProfile';
import PostGig from '../components/PostGig'
import Scream from '../components/Scream';
import ScreamSkeleton from '../components/ScreamSkeleton'

import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'


class home extends Component {

    componentDidMount(){
        this.props.getScreams()
    }
    render() {
        const { screams,loading }=this.props.data;
        let recentScreamsMarkup= !loading ? (
            screams.map((scream)=><Scream key={scream.screamId} scream={scream}/>)
        ) : (
            <ScreamSkeleton/>
        );
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item sm={3} xs={12}>                      
                        <PostGig/>
                        <Profile/>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        {recentScreamsMarkup}
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <ComingEvents/>                       
                        <Hidden only="sm">
                            <TeamProfile/>
                        </Hidden>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

home.propTypes={
    getScreams:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    data:state.data
})

export default connect(mapStateToProps,{getScreams})(home);
