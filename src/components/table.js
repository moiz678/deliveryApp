import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';  
import {myFirebase} from "../firebase/firebase";
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';  
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';    
import { useState, useEffect } from 'react'  

  
const useItems = () => {
    const [items, setItems] = useState([]); //useState() hook, sets initial state to an empty array
    useEffect(() => {
      myFirebase
        .firestore() //access firestore
        .collection("users") //access "items" collection
        .onSnapshot(snapshot => {
          //You can "listen" to a document with the onSnapshot() method.
          const listItems = snapshot.docs.map(doc => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data() //spread operator merges data to id.
          }));
          setItems(listItems); //items is equal to listItems
        });
    }, []);
    return items;
};

const deleteItem = (id) => {
    myFirebase
      .firestore()
      .collection("users")
      .doc(id)
      .delete()
}

  
const useStyles = makeStyles({  
  root: {  
    width: '80%',  
    margin: 'auto'
  },  
  container: {  
    maxHeight: 440,  
  },  
});  
  
const MaterialTableDemo = ({editItem}) => {  
  const classes = useStyles();  
//   const [page, setPage] = React.useState(0);  
//   const [data, setData] = useState([]);   
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);  
//   useEffect(() => {    
//         const GetData = async () => {    
//           const result = await axios('http://localhost:51760/Api/Emp/employee');    
//           setData(result.data);    
//         }  
//         GetData();    
//         console.log(data);  
// }, []);   
//   const handleChangePage = (event, newPage) => {  
//     setPage(newPage);  
//   };  
  
//   const handleChangeRowsPerPage = event => {  
//     setRowsPerPage(+event.target.value);  
//     setPage(0);  
//   };  
//   const ItemList = ({editItem}) => {
    const listItem=useItems();
  return (  
    <Paper className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
        <TableHead>  
            <TableRow>
              {/* <TableCell align="right">Id</TableCell> */}
              <TableCell align="right">First Name</TableCell>  
              <TableCell align="right">Last Name</TableCell>  
              <TableCell align="right">Email</TableCell>  
              <TableCell align="right">Phone</TableCell>  
              <TableCell align="right">Date</TableCell>  
              <TableCell align="right">Actions</TableCell>
            </TableRow>  
          </TableHead>
        
          {listItem.map(item => ( 
          <TableBody key={item.Id}>   
           <TableRow>   
                {/* <TableCell component="th" scope="row">  
                   {item.Id}
                </TableCell>  */}
                <TableCell align="right">{item.fname}</TableCell>  
                <TableCell align="right">{item.lname}</TableCell>  
                <TableCell align="right">{item.email}</TableCell>  
                <TableCell align="right">{item.phone}</TableCell>  
                <TableCell align="right">{item.date}</TableCell>  
                <TableCell align="right">
                  <IconButton aria-label="create">
                    <CreateIcon
                    onClick={() => editItem(item)}
                    />
                  </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                      onClick={() => deleteItem(item.id)}
                      />
                    </IconButton>
                </TableCell>  
              </TableRow>   
          </TableBody> 
          ))} 
        </Table>  
      </TableContainer>  
      {/* <TablePagination  
        rowsPerPageOptions={[5, 10, 15]}  
        component="div"  
        count={data.length}  
        rowsPerPage={rowsPerPage}  
        page={page}  
        onChangePage={handleChangePage}  
        onChangeRowsPerPage={handleChangeRowsPerPage}  
      />   */}
    </Paper>  
  );  
} 
// }
export default MaterialTableDemo;