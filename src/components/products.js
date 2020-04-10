import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState, useEffect } from 'react'  
import {myFirebase} from "../firebase/firebase";
import {addToCart} from "../actions/cartActions";
import {connect } from "react-redux"





const useItems = () => {
    const [items, setItems] = useState([]); //useState() hook, sets initial state to an empty array
    useEffect(() => {
      myFirebase
        .firestore() //access firestore
        .collection("Products") //access "items" collection
        .onSnapshot(snapshot => {
          //You can "listen" to a document with the onSnapshot() method.
          const listItems = snapshot.docs.map(doc => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data() //spread operator merges data to id.
          }));
          setItems(listItems); //items is equal to listItems
          console.log(listItems)
        });
    }, []);
    return items;
};



const useStyles = makeStyles((theme) => ({
  root: {
    // display: "inline-block",
    margin: 10,
    width:325,
    display : 'inline-block',
  },
  product:{
      textAlign: "center",
    },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  price: {
    textAlign: "center",
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Products(props) {
  const classes = useStyles();
  const listItem=useItems();
  
  function handleClick(key) {

    const productItem = listItem.find(data => data.id === key);
    props.addToCart(productItem)
  }

  
  return (
    <div className = {classes.product}>
    {listItem.map(item => (
        <Card className={classes.root} key={item.Id}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    P
                </Avatar>
                }
                
            />
            <CardContent key={item.Id} class = {classes.product}>
                {item.file}
            </CardContent>
            
            <CardContent key={item.Id} class = {classes.product}>
                <Typography variant="h6" color="textSecondary" component="h3">
                {item.pname}
                </Typography>
            </CardContent>
            <CardContent class = {classes.price}>
                <Typography variant="h6" color="textSecondary" component="h3">
                $ {item.price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton >
                <IconButton aria-label="cart" onClick={()=>{handleClick(item.id)}}>
                <ShoppingCartIcon  />
                </IconButton>
              </CardActions>
        </Card>
    ))}
    </div>
  );
}

const mapDispatchToProps= (dispatch)=>{
    
  return{
      addToCart: (data)=>{dispatch(addToCart(data))}
  }
}

export default connect(null, mapDispatchToProps)(Products); 