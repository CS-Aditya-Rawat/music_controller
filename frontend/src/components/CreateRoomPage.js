import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component{
    defaultVotes = 2;
    constructor(props){
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange(e){
        this.setState({
            votesToSkip: e.target.value,
        });
    }
    handleGuestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value == 'true' ? true : false,
        });
    }
    handleRoomButtonPressed() {
        const requestOption = {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip : this.state.votesToSkip,
                guest_can_pause : this.state.guestCanPause,
            }),
        };
        fetch("/api/create-room", requestOption).then((response) =>
        response.json()
        ).then((data) => this.props.history.push('/room/'+data.code) );
    }


    render(){
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create A Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component='fieldset'>
                    <FormHelperText>
                        <div align="center">Guest Control of Playback State</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                        <FormControlLabel 
                        value="true" 
                        control={<Radio color="primary" />}
                        label="Play/Pause"
                        labelplacement="bottom"
                    />
                    <FormControlLabel
                        value="false" 
                        control={<Radio color="secondary" />}
                        label="No Control"
                        labelplacement="bottom"
                    />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                    required={true} 
                    type="number" 
                    defaultValue={this.defaultVotes} 
                    onChange={this.handleVotesChange}
                    inputProps={{
                        min:1,
                        style:{textAlign: "center"},
                    }}
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes required to skip
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button 
                variant="contained" 
                color="primary"
                onClick={this.handleRoomButtonPressed}>
                    Create Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                variant="contained" 
                color="secondary" 
                to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
        );
    }
}