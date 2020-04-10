import React, {Component} from 'react';  
import { withStyles } from '@material-ui/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';  
import IconButton from '@material-ui/core/IconButton';
import { Button, Container } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import Recipe from './Recipe'
import { removeItem,addQuantity,subtractQuantity} from '../actions/cartActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const styles = theme => ({  
  root: {  
    margin: 'auto'
  },  
  container: {  
    maxHeight: 440,  
  },
  field: {
      width: '2ch',
  },
  margin: {
  },
  total: {
    maxWidth: "20%"
  },
  subTotal: {
    marginTop: 50,
  },
  
}); 

class Cart extends Component{

  //to remove the item completely
  handleRemove = (id) =>{
    this.props.removeItem(id);
  }
  //to add the quantity
   handleAddQuantity = (data) =>{
     debugger
    this.props.addQuantity(data);
  }
  //to substruct from the quantity
  handleSubtractQuantity = (data) =>{
    debugger
    this.props.subtractQuantity(data);
  }

  render(){

    const { classes } = this.props;

    let addedItems =this.props && this.props.items && this.props.items.length ?
    (
      this.props.items.map(item => {
        debugger
        return (
          <TableRow key={item.id}>
            <TableCell align="center">
              <Typography>
                image
              </Typography>
            </TableCell>
            <TableCell align="center">{item.pname}</TableCell>
            <TableCell align="center">
              <Typography color="secondary">
                $ {item.price}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Badge color="secondary" badgeContent={item.quantity}></Badge>
              <ButtonGroup>
                <Link to="/Cart">
                  <Button
                    aria-label="reduce"
                    onClick={()=>{this.handleSubtractQuantity(item)}}
                >
                  <RemoveIcon fontSize="small" />
                  </Button>
                </Link>
                <Link to="/Cart">
                  <Button
                    aria-label="increase"
                    onClick={()=>{this.handleAddQuantity(item)}}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Link>
              </ButtonGroup>
            </TableCell>
            <TableCell align="center">
              <IconButton aria-label="create"
                onClick={()=>{this.handleRemove(item.id)}}
              >
                <DeleteIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
          )
      })
    ):
    (<Typography>Nothing</Typography>)
    debugger
    return(
      <div>
        <Container>
          <Typography variant="h4" component="h2">Cart</Typography>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>  
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addedItems}
                  </TableBody>
                </Table>
              </TableContainer>
          </Paper>
          <Typography variant="h4" component="h2">Total Amount</Typography>
          <Recipe/>
        </Container>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  debugger
  return{
      items: state.cartReducer.addedItems,
      //addedItems: state.addedItems
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
      removeItem: (id)=>{dispatch(removeItem(id))},
      addQuantity: (data)=>{dispatch(addQuantity(data))},
      subtractQuantity: (data)=>{dispatch(subtractQuantity(data))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Cart))
