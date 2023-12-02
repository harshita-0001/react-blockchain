import { SocialIcon } from "react-social-icons";
import CryptoBudge from "./crypto-budge";
import Swap from "./swap";
import ProgressBar from "./progress-bar";
import { NavLink } from "react-router-dom";
const Card=({item,status})=>{
    return(
      //  <Link to={`/product/${item.title}`}>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <NavLink to={status!="coming soon"&&`/projects/${item.address}`} style={{textDecoration:"none"}}>
            <div className="card p-4 bg-dark text-light">
              <div className="card-body d-flex">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt="..."
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />

                <div className="d-flex flex-column mx-3">
                  <h5 className="card-title">{item?.title}</h5>
                  <div className="row">
                    <div className="col">
                      <div className="d-flex justify-content-between">
                        {item?.link?.map((img, i) => (
                          <SocialIcon
                            url={img}  //url of image
                            style={{
                              margin: "0px 5px",
                              width: "30px",
                              height: "30px",
                            }}
                            key={`social-${i}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* status badge */}
                  <span
                    className={`badge badge-pill badge-primary text-black ${status==="opened"?'bg-success':status==="coming soon"?'bg-warning':'bg-danger'} mt-2`}
                    style={{
                        width:"100px",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "4.2px 8px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display:"inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                      }}
                    ></span>
                   {
                    status==="opened"?"open":status==="coming soon"?`openat ${item.source}`:"closed"
                   }
                  </span>
                  {/* crypto badge */}
                  <div style={{
                    display:"flex",
                  }}>
                    {
                        item?.crypto?.map((crypto,i)=>( 
                            <CryptoBudge value={crypto} key={`crypto-${i}`}/>
                        ))
                    }
                  </div>
                </div>
              </div>
              {/* paragraph */}
              <div>
                <p className="card-text text-start" >
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                {/* swap section */}
               <div style={{display:"flex",justifyContent:"space-between"}}>
                   <Swap title="Swap rate" content={item?.swapRate}/>
                   <Swap title="Cap" content={item?.cap}/>
                   <Swap title="Access" content={item?.access}/>
               </div>
               {/* progressbar */}
               <div>
                <ProgressBar participants={item?.participants}/>
               </div>
              </div>
            </div>
            </NavLink>
          </div>
      //  </Link>
    )
}

export default Card;