import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
        //   width: theme.spacing(79),
        //   height: theme.spacing(1),
        },
    },
    productData:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            color: theme.palette.text.secondary,
            
        },
    },
    paper1: {
          width: theme.spacing(100),
          padding: theme.spacing(2),
      },  
    paper2: {
        width: theme.spacing(58),
        padding: theme.spacing(2),
    }, 
    paper3: {
        width: theme.spacing(18),
        marginRight: theme.spacing(1),
    },  
    paper4: {
      width: theme.spacing(35),
      padding: theme.spacing(2),
    }, 
    paper: {
     
    },
  }));

export default function Cart() {
    const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl"  >
        
            <Grid item xs={12}>
                <Paper className={classes.paper} elevation={3}>
                <div className={classes.root}>
                    <Paper elevation={2} className={classes.paper1}>
                    </Paper>
                    <Paper elevation={2} className={classes.paper2}>
                        <Typography component="h3" variant="h4" style={{textAlign:"center", padding: 2,}}>
                            Product Title
                        </Typography><hr/>
                        <Button variant="contained" color="primary" component="span">
                            1200 $
                        </Button>
                        <div className={classes.productData}>
                        <Paper elevation={2} className={classes.paper3}>
                        </Paper>
                        <Paper elevation={2} className={classes.paper4}>
                        </Paper>
                        </div>
                    </Paper>
                    
                </div>
                </Paper>
            </Grid>
      </Container>
    </React.Fragment>
  );
}
