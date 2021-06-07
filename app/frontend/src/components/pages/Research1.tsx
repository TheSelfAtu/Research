import React , {useState} from "react"
import AlertDialog from "../organisms/Dialog";
import Button from '@material-ui/core/Button';
export function Research1(): JSX.Element {
    const [questionNumber, setquestionNumber] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(0);

    return(
<Button variant="contained" color="secondary">マウスを重ねると音がなります</Button>
    )
}