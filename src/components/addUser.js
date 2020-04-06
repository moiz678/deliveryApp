import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "./helper.css";

import '../firebase/firebase'
import { myFirebase } from '../firebase/firebase';




const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema=Yup.object().shape({
    fname: Yup.string()
    .min(3, "Your First Name is too short")
    .required("Please enter your First Name"),

    lname: Yup.string()
    .min(3, "Your Last Name is too short")
    .required("Please enter your Last Name"),

    email: Yup.string()
    .email("The email is incorrect")
    .required("Please enter your Email"),

    phone: Yup.string()
    .min(0, 'Minimum value 0')
    .max(15, 'Maximum value 15')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required.'),

    date: Yup.string()
    .nullable()
    .test('Date of Birth', 'Should be greather than 18', function(value) {
    return moment().diff(moment(value), 'years') >= 1;
    }),
})





class AddUser extends Component {
    constructor(props){
        super(props)
        this.state = {
          setFormValues : null
        }
        //fireStore DB
      this.state = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        date: "",
      };
    }

    submitValue = (value) =>{
        this.setState({
          setFormValues:value
        })
      }
    
      updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }


      //fireStore DB
      handleSubmit = (e) => {
      debugger
      e.preventDefault();
      const db = myFirebase.firestore();
      // db.settings({
      //   // timestampsInSnapshots: false
      // });
      const userRef = db.collection("users").add({
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        phone: this.state.phone,
        date: this.state.date,
    });  
      this.setState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        date: ""
      });
    };
    
    render(){
        return(
            <div className="app">
                <h1> Add User </h1>

                <Formik
                initialValues={{ 
                    fname: "",
                    lname: "",
                    email: "",
                    phone: "",
                    date: ""
                }}
                
                validationSchema={validationSchema}

                onSubmit={async (values, {setSubmitting}) => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify("Your Form is Submit"));

                    const db = myFirebase.firestore();
                    const userRef = db.collection("users").add(values);
                    setSubmitting(false); 
                }}

                >
                {props => {
                    const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                    } = props;

                    return (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fname" style={{ display: "block" }}>
                        First Name
                        </label>
                        <input
                        name="fname"
                        placeholder="Enter your First Name"
                        type="text"
                        value={values.fname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.fname && touched.fname
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.fname && touched.fname && (
                        <div className="input-feedback">{errors.fname}</div>
                        )}


                        <label htmlFor="lname" style={{ display: "block" }}>
                        Last Name
                        </label>
                        <input
                        name="lname"
                        placeholder="Enter your Last Name"
                        type="text"
                        value={values.lname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.lname && touched.lname
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.lname && touched.lname && (
                        <div className="input-feedback">{errors.lname}</div>
                        )}


                        <label htmlFor="email" style={{ display: "block" }}>
                        Email
                        </label>
                        <input
                        name="email"
                        placeholder="Enter your Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.email && touched.email
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                        )}

                        
                        <label htmlFor="phone" style={{ display: "block" }}>
                        Phone
                        </label>
                        <input
                        name="phone"
                        placeholder="Enter your Phone Number"
                        type="tel"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.phone && touched.phone
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.phone && touched.phone && (
                        <div className="input-feedback">{errors.phone}</div>
                        )}

                        <label htmlFor="date" style={{ display: "block" }}>
                        DOB
                        </label>
                        <input
                        name="date"
                        placeholder="Enter your Date of Birth"
                        type="date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.date && touched.date
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.date && touched.date && (
                        <div className="input-feedback">{errors.date}</div>
                        )}


                        <button
                        type="button"
                        className="outline"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                        >
                        Reset
                        </button>
                        <button type="submit" disabled={isSubmitting}>
                        Submit
                        </button>

                        {/* <DisplayFormikState {...props} /> */}
                    </form>
                    );
                }}
                </Formik>

                {/* <MoreResources /> */}
            </div>
        )
    }   
}
export default AddUser;