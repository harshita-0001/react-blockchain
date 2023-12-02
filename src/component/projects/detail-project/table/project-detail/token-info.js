import ProjectDetailTable from "./commom-table";

const TokenInfo = ({ detail }) => {
  const key = ["title", "value"];
  const data = [
    {
      [key[0]]: "Name",
      [key[1]]: detail.title,
    },
    {
      [key[0]]: "Token Symbol",
      [key[1]]: detail?.symbol,
    },
    {
      [key[0]]: "Total Supply",
      [key[1]]: detail?.totalSupply,
    },
  ];
  
  const header = ["Token Information"];

  return <ProjectDetailTable header={header} detail={data} objectKey={key} />;
};

export default TokenInfo;
