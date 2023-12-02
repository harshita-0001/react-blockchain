const CryptoBudge=({value})=>{
  // set value dynamically
    return(
        <span
                            className="badge badge-pill badge-primary text-black bg-info m-1 rounded-5"
                            style={{
                                width:"50px",
                             }}
                          >
                            {value}
                          </span>
    )
}

export default CryptoBudge;