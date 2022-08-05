import React from 'react';

const apiRequest = async (url = '', optionsObj: any = null, errMsg: any = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if(!response.ok) throw Error('Please reload the app');
    } catch(err: any) {
        errMsg = err.message;
    } finally {    
        return errMsg;
    }
};

export default apiRequest;