import { fmParamsType, fmParamsList } from "../../@types/fmParams";

interface ParametersTableProps {
  fmParamsList: fmParamsList;
}
export function ParametersTable(props: ParametersTableProps) {
  return (
    <table className="border text-center">
      <tbody>
        <tr>
          <th>operator</th>
          <th>atack</th>
          <th>decay</th>
          <th>sustain</th>
          <th>release</th>
          <th>frequency</th>
          <th>ratioToFrequency</th>
          <th>modulationIndex</th>
        </tr>
        {Object.keys(props.fmParamsList).map((key: string) => {
          console.log("table", props.fmParamsList[key].atack);
          return (
            <tr>
              <td>{key}</td>
              <td>{props.fmParamsList[key].atack}</td>
              <td>{props.fmParamsList[key].decay}</td>
              <td>{props.fmParamsList[key].sustain}</td>
              <td>{props.fmParamsList[key].release}</td>
              <td>{props.fmParamsList[key].frequency}</td>
              <td>{props.fmParamsList[key].ratioToFoundamentalFrequency}</td>
              <td>{props.fmParamsList[key].modulationIndex}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}