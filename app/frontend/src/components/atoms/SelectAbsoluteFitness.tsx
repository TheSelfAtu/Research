import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { chromosomesParams } from "../../@types/chromosomesParams";

interface SelectFitnessProps {
  fitnessValue: string;
  chromosomeNumber: string;
  chromosomesParams: chromosomesParams;
  setChromosomesParams: React.Dispatch<
    React.SetStateAction<chromosomesParams | null>
  >;
}

// スタイルを修正
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function SelectFitness(props: SelectFitnessProps) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="fitness">擬音語への近さ</InputLabel>
        <Select
          labelId="fitness"
          defaultValue="-"
          value={props.fitnessValue}
          onChange={(event) => {
            const chromosomeNumber: keyof chromosomesParams =
              props.chromosomeNumber as keyof chromosomesParams;
            const prevChromosomesParams =
              props.chromosomesParams[chromosomeNumber];
            prevChromosomesParams.fitness = event.target.value as string;

            props.setChromosomesParams({
              ...props.chromosomesParams,
              [props.chromosomeNumber]: prevChromosomesParams,
            });
          }}
        >
          <MenuItem value="">-</MenuItem>
          <MenuItem value="1">擬音語とまったく近くない</MenuItem>
          <MenuItem value="2">擬音語とあまり近くない</MenuItem>
          <MenuItem value="3">擬音語と少し近い</MenuItem>
          <MenuItem value="4">擬音語とほとんど一致している</MenuItem>
          <MenuItem value="5">擬音語と一致している</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
