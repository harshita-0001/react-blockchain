import { Fragment } from "react";
import { SocialIcon } from "react-social-icons";
import CryptoBudge from "../card/crypto-budge";

const Detail = ({ detail }) => {
  return (
    <Fragment>
      <div className="d-flex flex-column p-3">
        <img
          src={detail?.img}
          style={{ width: "100px", heigth: "100px", borderRadius: "50%" }}
        />
      </div>
      <div className="d-flex">
        <h1 className="text-start px-3">{detail?.title}</h1>
        <div className="pt-2">
          {detail?.link?.map((img, i) => (
            <SocialIcon
              url={img} //url of image
              style={{
                margin: "0px 5px",
                width: "20px",
                height: "20px",
              }}
              key={`social-detail-${i}`}
            />
          ))}
        </div>
      </div>
      <div className="px-3">
        <span
          className={`badge badge-pill badge-primary text-black bg-info px-3 rounded-5`}
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "space-between",
            padding: "4.2px 8px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          ></span>
          opened
        </span>
      </div>
      <div className="d-flex px-2 mt-1">
        {detail?.crypto?.map((crypto, i) => (
          <CryptoBudge value={crypto} key={`crypto-detail-${i}`} />
        ))}
      </div>
      <p className="text-start px-3">{detail?.description}</p>
      <div className="d-flex justify-content-start px-3">
      <button className="rounded-5 px-3 py-2 bg-warning text-light border-warning">Connect Wallet</button>
      </div>
    </Fragment>
  );
};

export default Detail;
