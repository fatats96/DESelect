import React from 'react';

import Axios from 'axios';

var HttpReq = Axios.create({
    baseURL:"http://localhost:5000/",
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
})

export {HttpReq};