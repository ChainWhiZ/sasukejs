import React, { useEffect, useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const StakeInputField = (props) => {
    return (
        <div className="stake-input-parent">
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className="stake-input">
                <OutlinedInput

                    endAdornment={<InputAdornment position="end" style={{ color: "white" }}>CHW</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    onChange={(e) => { console.log(e); props.handleStakeAmount(e.target.value) }}
                    value={props.stakeAmoount}

                />
            </FormControl>
            <button className="staking-button">Stake</button>
        </div>

    )
}

export default StakeInputField