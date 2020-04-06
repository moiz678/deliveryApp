// import React, { useState } from "react";
// import {myFirebase} from "../firebase/firebase";
// import ItemList from "./itemlist";
// import AddUser from "./addUser";
// // import "./styles/global.css";
// import UpdateItem from "./updateitem";

// const Crud = () => {
//   const initialItemState = [
//     { id: null, fname: "", lname: "", email: "", phone: "", date:"" }
//   ];

//   const [editing, setEditing] = useState(false);

//   const [currentItem, setCurrentItem] = useState(initialItemState);

//   const editItem = item => {
//     setEditing(true);
//     setCurrentItem({
//       id: item.id,
//       fname: item.fname,
//       lname: item.lname,
//       email: item.email,
//       phone: item.phone,
//       date: item.date,
//     });
//   };

//   const updateItem = ({ currentItem }, updatedItem) => {
//     console.log(
//       "It send the item to the updated item function:",
//       updatedItem,
//       currentItem.id
//     );
//     setEditing(false);
//     myFirebase
//       .firestore()
//       .collection("users")
//       .doc(currentItem.id)
//       .update(updatedItem);
//   };

//   return (
//     <div>
//       <h1>Firestore CRUD App</h1>
//       <h2>User List</h2>
//       <ItemList editItem={editItem} />
//       {/* <h2>Add User</h2> */}
//       {editing ? (
//         <UpdateItem
//           setEditing={setEditing}
//           currentItem={currentItem}
//           updateItem={updateItem}
//         />
//       ) : (
//         <AddUser />
//       )}
//     </div>
//   );
// };
// export default Crud;