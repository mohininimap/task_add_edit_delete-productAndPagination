import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useNavigate,useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addProduct, getSingleProduct, updateProduct } from './../redux/action';
 const useStyles=makeStyles((theme)=>({
    root:{
      marginTop:100,
        "& > *":{
            margin:theme.spacing(1),
            width:"45ch",
        }
    }
 }))
const EditProduct = () => {
    const classes=useStyles();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let {id}=useParams();
    const {product} =useSelector(state=>state.data)
    const [state,setState]=useState({
      name:"",
      karat:"",
      weight:"",
      price:""
    })

    const [error,setError]=useState("");
    const {name,karat,weight,price}=state;

    useEffect(()=>{
        dispatch(getSingleProduct(id))
    },[])

    useEffect(()=>{
   if(product){
    setState({...product});
   }
    },[product])

const handleChange=(e)=>{
let {name,value}=e.target;
setState({...state,[name]:value})
}

const handleSubmit=(e)=>{
e.preventDefault();
if(!name || !karat || !weight || !price){
  setError("Please input the all input fields");
}
else{
dispatch(updateProduct(state,id));
navigate('/');
setError("");
}
}

  return (
    <div>

<Button 
      style={{width:"100px",marginTop:"20px"}}
      variant="contained"
      color="secondary"
    
      onClick={()=>navigate('/')}
      >Go Back</Button>
      {error && <h3 style={{color:"red"}}>{error}</h3>}
       <Box
       className={classes.root}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2 style={{margin:"auto"}} >Edit Product</h2>

      <TextField 
    onChange={handleChange}
    id="standard-basic"
    name="name"
    label="Name" value={name} type="text"/>
    <br/>

    <TextField 
     onChange={handleChange}
     name="karat"
    id="standard-basic" label="Karat"  value={karat} type="text"/>
    <br/>
    
    <TextField 
     onChange={handleChange}
     name="weight"
    id="standard-basic" label="weight"  value={weight} type="text"/>
    <br/>

    <TextField 
     onChange={handleChange}
     name="price"
    id="standard-basic" label="price"  value={price} type="text"/>
    <br/>

    
      <Button 
      style={{width:"100px"}}
      variant="contained"
      color="primary"
      type="submit"
      >Update</Button>

    </Box>
    </div>
  )
}

export default EditProduct