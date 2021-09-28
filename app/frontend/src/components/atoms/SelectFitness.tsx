import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { fmParamsList, chromosomesParams } from "../../@types/fmParams";

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
        <InputLabel id="fitness">適応度</InputLabel>
        <Select
          labelId="fitness"
          //   id="demo-simple-select"
          defaultValue="-"
          value={props.fitnessValue}
          onChange={(event) => {
            const chromosomeNumber: keyof chromosomesParams =
              props.chromosomeNumber as keyof chromosomesParams;
            let prevChromosomesParams =
              props.chromosomesParams[chromosomeNumber];
            prevChromosomesParams.fitness = event.target.value as string;

            props.setChromosomesParams({
              ...props.chromosomesParams,
              [props.chromosomeNumber]: prevChromosomesParams,
            });
          }}
        >
          <MenuItem value="">-</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
