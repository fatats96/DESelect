import React from 'react';

export default{
   firstName:{
       type:"string",
       value:"",
       regex:new RegExp("^[a-zA-Z ]*$")
    },
   lastName:{
    type:"string",
    value:"",
    regex:new RegExp("^[a-zA-Z ]*$")
    },
    age:{
        type:"int",
        value:0,
        regex:new RegExp("^[0-9 ]*$")
    },
    nationality:{
        type:"string",
        value:"",
        regex:new RegExp("^[a-zA-Z ]*$")
    }

}