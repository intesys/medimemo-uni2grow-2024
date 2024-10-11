import React, {useEffect} from "react";
import  {useLocation} from "react-router-dom"
function AddEditTherapy(){
    const location = useLocation();
    // const {therapy, doctor, medicines} = location.state;
   

    return(
        <>
        <div>Add/Edit Therapy</div>
        </>
    );
}

export default AddEditTherapy;

