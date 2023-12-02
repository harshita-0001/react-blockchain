const ProjectDetailTable = ({ objectKey, detail, header }) => {
  return (
    <table className="table w-100 text-start border">
      <thead>
        <tr>
          {Array.isArray(header) &&
            header?.map((head, i) => {
              let column = header.length == 1 ? 2 : 0;
              return (
                <th scope="col" colSpan={column} key={`head-${head}-${i}`}>
                  {head}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {/* {
            Array.isArray(heading)&&heading?.map((val,i)=>(
                <tr key={`pool-${i}`}>
                <td scope="row">{val}</td>
                <td>{detail[i]}</td>
              </tr>
            ))
       } */}

        {Array.isArray(detail) &&
          detail?.map((val, i) => (
            <tr key={`pool-${i}`}>
              {objectKey?.map((title, i) => (
                <td scope="row">{val[title]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ProjectDetailTable;
