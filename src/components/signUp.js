import React, { Component } from "../../node_modules/react";
import { connect } from "../../node_modules/react-redux";
import { Redirect } from "../../node_modules/react-router-dom";
import { signUpUser } from "../actions";
import { withStyles } from "../../node_modules/@material-ui/styles";
import {Link} from "react-router-dom";

import Avatar from "../../node_modules/@material-ui/core/Avatar";
import Button from "../../node_modules/@material-ui/core/Button";
import TextField from "../../node_modules/@material-ui/core/TextField";
import LockOutlinedIcon from "../../node_modules/@material-ui/icons/LockOutlined";
import Typography from "../../node_modules/@material-ui/core/Typography";
import Paper from "../../node_modules/@material-ui/core/Paper";
import Container from "../../node_modules/@material-ui/core/Container";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
});

class signUp extends Component {
  state = { name:"", email: "", password: "", confirmPassword:""};

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleConfirmPasswordChange = ({ target }) => {
    this.setState({ confirmPassword: target.value });
  };
  
  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(signUpUser(email, password));
  };

  render() {
    const { classes, SignUpError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            {/* <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="name"
              label="Full Name"
              type="text"
              id="name"
              onChange={this.handleNameChange}
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePasswordChange}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={this.handleConfirmPasswordChange}
            /> */}
            {SignUpError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Register Now
            </Button>
            <p>You have already Account? <Link to="/Login">Login</Link></p>
          </Paper>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    SignUpError: state.auth.SignUpError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default withStyles(styles)(connect(mapStateToProps)(signUp));