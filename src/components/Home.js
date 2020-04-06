import React, { useState } from "../../node_modules/react";
import { connect } from "../../node_modules/react-redux";
import { logoutUser } from "../actions";
import {myFirebase} from "../firebase/firebase";
import MaterialTableDemo from "./table";
import AddUser from "./addUser";
// import "./styles/global.css";
import UpdateItem from "./updateitem";



const Home = (props) => {
  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  };

  //Crud Sysytem
  const initialItemState = [
    { id: null, fname: "", lname: "", email: "", phone: "", date:"" }
  ];

  const [editing, setEditing] = useState(false);

  const [currentItem, setCurrentItem] = useState(initialItemState);

  const editItem = item => {
    setEditing(true);
    setCurrentItem({
      id: item.id,
      fname: item.fname,
      lname: item.lname,
      email: item.email,
      phone: item.phone,
      date: item.date,
    });
  };

  const updateItem = ({ currentItem }, updatedItem) => {
    console.log(
      "It send the item to the updated item function:",
      updatedItem,
      currentItem.id
    );
    setEditing(false);
    myFirebase
      .firestore()
      .collection("users")
      .doc(currentItem.id)
      .update(updatedItem);
  };
  
    const { isLoggingOut, logoutError } = props;
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>


        <h1>Delivery App</h1>
      <MaterialTableDemo editItem={editItem} />
      {/* <h2>Add User</h2> */}
      {editing ? (
        <UpdateItem
          setEditing={setEditing}
          currentItem={currentItem}
          updateItem={updateItem}
        />
      ) : (
        <AddUser />
      )}


        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(Home);