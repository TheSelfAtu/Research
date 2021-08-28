import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fmParamsList, genesParams } from "../../@types/fmParams";

interface SelectFitnessProps {
  fitnessValue: string;
  genesParameters: genesParams;
  setGenesParameters: React.Dispatch<React.SetStateAction<genesParams | null>>;
}

export function SelectFitness(props: SelectFitnessProps) {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">適応度</InputLabel>
      <Select
        labelId="fitness"
        //   id="demo-simple-select"
        value={props.fitnessValue}
        onChange={handleChange}
      >
        <MenuItem value={""}>-</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );
}
