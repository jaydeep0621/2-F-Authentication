function  response(res,data,message, status, error){
    const responsedata = {
        status,
        message,
        data : data,
        error : error || null,
    };
    res.status(status);
    res.format({
        json : ()=>{
            res.json(responsedata)
        }
    })
}

module.exports = {
    response
}