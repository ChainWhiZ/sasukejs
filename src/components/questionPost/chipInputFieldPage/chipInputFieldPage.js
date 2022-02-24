import React, { useEffect } from "react";
import ChipInput from 'material-ui-chip-input'
import Grid from "@material-ui/core/Grid";
import SimpleAlerts from "../../alert/alert";

export default function ChipInputComponent(props) {
  function handleAddChip(chip) {
    props.handleChipData((prevState) => [...prevState, chip]);
  }
  function handleDeleteChip(chip) {
    props.handleChipData(props.chipData.filter((ele) => ele !== chip));
  }
  function handleLabel() {
    if (props.pageState === 2) return "Enter Category Labels";
    if (props.pageState === 3) return "Enter languages or tools";
    return '';
  }
  return (
    <>
     {props.alert.isValid ? (
        <SimpleAlerts severity={"warning"} message={props.alert.errorMessage} />
      ) : null}
      <Grid
        container
        direction="column"
        alignItems={ "center"}
        justifyContent={ "center"}
     
      >
        <Grid item md={12} xs={12} className={"margin-left-35"}>
          <p className="left-title ">{handleLabel()}</p>
        </Grid>
        <Grid item md={8} xs={8} className="margin-top-2">
          <ChipInput
            value={props.chipData}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            fullWidth={true}
            placeholder='Enter Tags'
            className='chip-input-field-style'
           
          />
        </Grid>
      </Grid>
    </>
  )
}