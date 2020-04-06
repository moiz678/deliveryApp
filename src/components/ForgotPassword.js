import React, { Component } from "../../node_modules/react";
import { withStyles } from "../../node_modules/@material-ui/styles";
import { myFirebase } from "../firebase/firebase";

import Dialog from '../../node_modules/@material-ui/core/Dialog';
import DialogActions from '../../node_modules/@material-ui/core/DialogActions';
import DialogContent from '../../node_modules/@material-ui/core/DialogContent';
import DialogContentText from '../../node_modules/@material-ui/core/DialogContentText';
import DialogTitle from '../../node_modules/@material-ui/core/DialogTitle';

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
const INITIAL_STATE = {
    email: '',
    error: null,
  };
  
class ForgotPassword extends Component {
    
  state = { email: "", error : null, open: false, setOpen: false };
  

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };
    handleClose = () => {
        this.setState({ 
            setOpen: false 
        });
  };
  handleSubmit = () => {
    const { email } = this.state;
    myFirebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      this.setState({ 
            ...INITIAL_STATE, 
            setOpen: true 
        });
    })
    .catch(error => {
      this.setState({ error });
    });
  };

  render() {
    const { classes } = this.props;
    
      return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Next
            </Button>
            
          </Paper>

          <Dialog
                open={this.state.setOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Email Send Successfully..."}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please Check your Email in order to reset your password...
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>

        </Container>
      );
    }
  }




export default withStyles(styles)(ForgotPassword);