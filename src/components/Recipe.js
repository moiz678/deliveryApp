import React, { Component } from 'react';  
import { withStyles } from '@material-ui/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableRow from '@material-ui/core/TableRow';  
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux'

  
const styles = theme => ({  
  root: {  
    margin: 'auto',
  },  
  container: {  
    maxHeight: 440,  
  },
  field: {
      width: '2ch',
  },
  total: {
    maxWidth: "30%"
  },
  subTotal: {
    marginTop: 50,
  },
  
});
class Recipe extends Component {  
  

  // componentWillUnmount(){
  //   if(this.refs.shipping.checked)
  //       this.props.substractShipping()
  // }

  handleChecked = (e) =>{
    if(e.target.checked){
        this.props.addShipping();
        console.log("hello")
    }
    else{
        this.props.substractShipping();
        console.log("hello")
    }
}
  render(){
    const { classes } = this.props;
    return (                  
    <div>
      <Container>
          <div className={classes.total}>
            <Paper className={classes.root} className={classes.price}> 
              <TableContainer className={classes.container}>  
                <Table stickyHeader aria-label="sticky table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <Checkbox
                          onChange= {this.handleChecked}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        Shipping(+6$)
                      </TableCell>
                      <TableCell>
                      </TableCell>    
                    </TableRow>     
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" component="h4">Total</Typography>
                      </TableCell>  
                      <TableCell align="right" >
                        <Typography color="secondary" variant="h6" component="h5">$ {this.props.total}</Typography>
                      </TableCell>    
                    </TableRow>   
                  </TableBody> 
                </Table>  
              </TableContainer>  
            </Paper>
          </div>
      </Container>
    </div> 
    )
}}

const mapStateToProps = (state)=>{
  debugger
    return{
        addedItems: state.cartReducer.addedItems,
        total: state.cartReducer.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Recipe))
