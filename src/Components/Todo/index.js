import React, { useState, useEffect } from "react";
import todoReducer from "./reducer";

import './App.css';
const initialState = [];

const Todo = () => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState);
  const [inputval, setInputval] = useState("");
  const [isEdit, setisEdit] = useState({state:false,value:''})

 
  const getdata = async() =>{
    const { name,status } = setInputval;
    const res = await fetch("/getdata", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    });
    
    const alldata = await res.json();
    dispatch({type:"initial",value:alldata})

  }

  useEffect(() => {
    getdata()
  },  []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addinputdata = async() => {
    try{
      const  name = inputval;
      const res = await fetch("/add",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name
        })
      });
      const all = await res.json();
      if(all.success){
        dispatch({ type: "add", value: name,id:all.data._id});
         setInputval('')
         }
    }
      catch(error){
            dispatch({
              type: "Fail",
          })
      }  
    };
    
  const deleteFunc= async(id)=>{
    
    try{
        const resp = await fetch(`deletedata/${id}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
          dispatch({ type: "delete", value: id });
     }
    catch(error){
      dispatch({
        type: "Fail",
    })
  }  
 }   
        
  const editFunc=(element)=>{
    console.log(element);
    setisEdit({state:true,value:element.id})
    setInputval(element.name)
    
  }

  const editStateFun= async()=>{
       //console.log("isEdit", isEdit)  
       try{
            const  name = inputval;
            const res = await fetch(`editdata/${isEdit.value}`,{
              method: "PUT",
              headers:{
                "Content-Type": "application/json"
              },
              body:JSON.stringify({
                name
              })
            });
          const data = await res.json();
            if(data.success){
              dispatch({ type: "edit", id: isEdit.value ,value:name })
              setisEdit({state:false})
              setInputval('')
            }
       }
       catch(error){
        dispatch({
          type: "Fail",
        })
       }  
  }

  const handlecomplete = async(id) =>{

       try{
            const res = await fetch(`handlecomplete/${id}`, {
              method: "PUT",
              headers:{
                "Content-Type": "application/json"
              }
          });
          const all = await res.json();
          if(all.success){
            dispatch({ type: "completed" ,value:id })
            }
       } 
       catch(error){
          dispatch({
            type: "Fail",
        })
      }  
            
          
  }

  
  return (
    <div className="container-fluid pt-4 ">
      <div className="col-sm-6 mx-auto">
        <div className="card ">
          <div className="card-header">
            <h3 className="text-center pt-5">Todo List </h3>
          </div>
          <div className="card-body">
            <form className="form-inline" onSubmit={handleSubmit}>
              <input  type="text"  name="name" placeholder="Enter Todo...."onChange={(e) => setInputval(e.target.value)} value={inputval}
                className="form-control"/>
              {!isEdit.state?
                <button
                  type="submit" className="btn btn-danger mt-3" onClick={addinputdata} >Add </button> 
              :
                <button type="submit" className="btn btn-danger mt-3" onClick={editStateFun} >Edit</button>
              }
             
                </form>
                  {
                    state.map((element,index) => {
                      return (
                        <>
                        <div className="row">
                          <div className="col-sm-9 pt-2 list " >
                            <p style= {{ textDecoration: element.status ? "line-through" : "" }}>{element.name}</p>
                        
                       
                          </div>
                          <div className="col-sm-3">
                          <i className="fa fa-edit editbtn"  onClick={()=>editFunc(element)}></i>
                          <i className="fa fa-trash  deletebtn " onClick={()=>deleteFunc(element.id)}></i>
                          <i style={{ color: element.status ? "red" : "" }} className="fa fa-check-circle  completebtn " onClick={()=>handlecomplete(element.id)}></i>
                          </div>
                        </div>
                        </>
                      )
                    })
                  }
                  </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;