import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "./helper.css";

import '../firebase/firebase'
import { myFirebase } from '../firebase/firebase';
import {storage} from '../firebase/firebase';






const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema=Yup.object().shape({
    pname: Yup.string()
    .min(3, "Your First Name is too short")
    .required("Please enter your First Name"),

    price: Yup.string()
    .min(1, 'Minimal value 1')
    .max(15, 'Maximum value 15')
    .matches(phoneRegExp, 'Minimum one value Enter')
    .required('Price is required.'),
})

class addProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
          setFormValues : null
        }
        //fireStore DB
      this.state = {
        pname: "",
        price: "",
        image: null,
        url: '',
      };
      //image handle //firebase storage image
      this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
    }
    
    //firebase storage image
    handleChange = e => {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
      }
    }
    handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      () => {
        // progrss function ....
        this.setState();
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
      });
    }
    

      //firebase database
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
      const userRef = db.collection("Products").add({
        pname: this.state.pname,
        price: this.state.price,
       
    });  
      this.setState({
        pname: "",
        price: "",
        
        
      });
    };
    
    render(){
        // const FILE_SIZE = 160 * 1024;
        // const   SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/PNG"];
        // const validateImageType = (value) => {
        //     if(value) {
        //         let type = value.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
        //         return SUPPORTED_FORMATS.includes(type)
        //     }
        // }
        // Yup.string() .test('fileSize', "File is too large", value => value.size <= FILE_SIZE) .test('fileType', "Your Error Message", value => SUPPORTED_FORMATS.includes(value.type) )
        return(
            <div className="app">
                <h1> Add Prooduct </h1>

                <Formik
                initialValues={{ 
                    pname: "",
                    price: "",
                    file: "",
                }}
                
                validationSchema={validationSchema}

                onSubmit={async (values, {setSubmitting}) => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify("Your Form is Submit"));

                    const db = myFirebase.firestore();
                    const userRef = db.collection("Products").add(values);
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
                        <label htmlFor="pname" style={{ display: "block" }}>
                        Product Name
                        </label>
                        <input
                        name="pname"
                        placeholder="Enter Product Name"
                        type="text"
                        value={values.pname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.pname && touched.pname
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.pname && touched.pname && (
                        <div className="input-feedback">{errors.pname}</div>
                        )}


                        <label htmlFor="price" style={{ display: "block" }}>
                        Product Price($)
                        </label>
                        <input
                        name="price"
                        placeholder="Enter Product Price"
                        type="text"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.price && touched.price
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.price && touched.price && (
                        <div className="input-feedback">{errors.price}</div>
                        )}


                        <label htmlFor="file" style={{ display: "block" }}>
                        Product Image
                        </label>
                        <input
                        name="file"
                        type="file"
                        onChange={this.handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.file && touched.file
                            ? "text-input error"
                            : "text-input"
                        }
                        />
                        {errors.file && touched.file && (
                        <div className="input-feedback">{errors.file}</div>
                        )}


                        <button
                        type="button"
                        className="outline"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                        >
                        Reset
                        </button>
                        <button type="submit" onClick={this.handleUpload} disabled={isSubmitting}>
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
export default addProduct;