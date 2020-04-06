import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import moment from "moment";
import '../firebase/firebase'
import { myFirebase } from '../firebase/firebase';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = Yup.object().shape({
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
        .min(0, 'Minimal value 0')
        .max(15, 'Maximum value 15') 
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone is required.'),
    date: Yup.string()
        .nullable()
        .test('Date of Birth', 'Should be greather than 18', function(value) {
          return moment().diff(moment(value), 'years') >= 1;
        }),
    // admin: Yup.string()
    //     .notOneOf([Yup.ref('chocolate'), null], 
    //     'Flavors must not match.'),
    // deliverBoy: Yup.string()
    //     .notOneOf([Yup.ref('vanilla'), null], 
    //     'Flavors must not match.'),
    // customer: Yup.string()
    //   .notOneOf([Yup.ref('vanilla'), null], 
    //   'Flavors must not match.'),
});




class userManage extends Component{
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
      const userRef = db.collection("data").add({
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

    
  //   afterSubmission(event) {
  //     let afterSubmitting = this.state.name;
  //     this.setState ({
  //         storedItemName:this.state.name
  //     }, function() {
  //         alert(this.state.name); // Shows the right value!
  //     });
  // }


    render(){
        return(
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        email: "",
        phone: "",
        date: "",
      }}
      validationSchema={validationSchema}

      
    
    onSubmit={(values, { setSubmitting }) => {

          // alert(JSON.stringify(values, null, 2));
          debugger
          const db = myFirebase.firestore();
          // db.settings({
          //   timestampsInSnapshots: false
          // });
          const userRef = db.collection("data").add(values);  
          
          setSubmitting(false);
        
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => { 
          return( 
          <form onSubmit={handleSubmit}>
              <input
              type="fname"
              name="fname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fname}
              valid={touched.fname && !errors.fname}
              error={touched.fname && errors.fname}
            />
            {errors.fname && touched.fname && errors.fname}   
            
            <br/>
            <input
              type="lname"
              name="lname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lname}
              valid={touched.lname && !errors.lname}
              error={touched.lname && errors.lname}
            />
            {errors.lname && touched.lname && errors.lname}

            <br/>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              valid={touched.email && !errors.email}
              error={touched.email && errors.email}
            />
            {errors.email && touched.email && errors.email}
            
            <br/>
            {/* <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password} */}
            
            <br/>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              valid={touched.phone && !errors.phone}
              error={touched.phone && errors.phone}
            />
            {errors.phone && touched.phone && errors.phone}

            <br/>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              valid={touched.date && !errors.date}
              error={touched.date && errors.date}
            />
            {errors.date && touched.date && errors.date}
            
            <br/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  </div>
)
}
}
export default userManage;