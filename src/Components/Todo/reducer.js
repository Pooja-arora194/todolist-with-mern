export const todoReducer = (state,action) => {
 // console.log("reducer",state,action)

  switch (action.type) {  
    
    case "add":
            console.log("action.value",action.value);
              return [...state,{name:action.value,id:action.id}]
             

     case "delete":

                return state.filter((element)=>element.id !== action.value)

      case "edit":
      
                let tmp=[...state]
                for(let x of tmp){
                  if(x.id === action.id){
                    x.name=action.value
                  }
                }
                return [...tmp]
            
      case "initial":

              let temp2=[]
              for(let x of action.value){
                temp2.push({name:x.name,id:x._id,status:x.status})
              }
            console.log("csfdsfd",temp2)
              return [...temp2]


        case "completed":

              let tmp1 = [...state]
              for(let x of tmp1){
                if(x.id == action.value){
                  x.status=action.value
                }
              }
              return [...tmp1]
          

    default:return state;
  }
};
export default todoReducer;