import Blockies from 'react-blockies';

export default function Avatar(props) {
    console.log(props)
    return (
        <Blockies
            className={props.className}
            seed={props.seed}
            scale={props.scale}
            color={props.color}
        />)
}