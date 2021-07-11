import React from 'react';
import axios from 'axios';
import {useFormik} from 'formik';

function RegisterProduct(){
 const formik = useFormik({
 initialValues : {
 ProductId: 0, 
 ProductName:0,
 CategoryName: 0,
 CategoryId: 0,
 },
 onSubmit: values => {
 axios.post("http://127.0.0.1:3030/addproducts",values);
 alert("Record Inserted");
 
 }
 })
 return(
   <>
   <form onSubmit={formik.handleSubmit}>
       <h3>Register Product</h3>
       <dl>
                <dt>ProductId</dt>
                <dd>
                <input type="text" name="ProductId" onChange={formik.handleChange} value={formik.values.ProductId} />
                </dd>
                <dt>ProductName</dt>
                <dd>
                   <input type="text" name="ProductName" onChange={formik.handleChange} value={formik.values.ProductName} />
                </dd>
                <dt>CategoryName</dt>
                <dd> 
                    <input type="text" name="CategoryName" onChange={formik.handleChange} value={formik.values.CategoryName} />
                </dd>
                <dt>CategoryId</dt>
                <dd> 
                    <input type="text" name="CategoryId" onChange={formik.handleChange} value={formik.values.CategoryId} />
                </dd>
       </dl>
       <button>Register</button>
 </form>
 </>
 )
}
export default class ProductDetailsComponent extends React.Component
{
 constructor(props) {
 super(props);
 this.state = {
 products : []
 }
 }
 componentDidMount(){
 axios.get("http://127.0.0.1:3030/getproducts")
 .then(response => { this.setState({
 products: response.data
 })
 })
 }
 render(){
 return(
 <>
 <div>
 <RegisterProduct />
 </div>
 <h2>Product Details</h2>
 <table className="table table-hover">
 <thead>
 <tr>
 <th>Product Id</th>
 <th>ProductName</th>
 <th>CategoryName</th>
 <th>CategoryId</th>
 </tr>
 </thead>
 <tbody>
 {
 this.state.products.map(product => 
 <tr key={product.ProductId}>
 <td>{product.ProductId}</td> 
 <td>{product.ProductName}</td>
 <td>{product.CategoryName}</td>
 <td>{product.CategoryId}</td>
 </tr>
 )
 }
 </tbody>
 </table>
 </>
 )
 }
}