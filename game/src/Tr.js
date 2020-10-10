import React from "react";
import Screen from "./Screen";
import {LEVELS_DICTIONARY} from "./constants";

function Tr({game, index}) {
    const {id, player_name, level, player_points,
        computer_points, image_path, created_at} = game;
    return (
        <tr key={id}>
            <td>{index + 1}</td>
            <td>{player_name}</td>
            <td>{LEVELS_DICTIONARY[level]}</td>
            <td>{player_points}</td>
            <td>{computer_points}</td>
            <td>
                {image_path !== ''
                    ? <Screen imagePath={image_path}/>
                    : <p>Brak screena</p>}
            </td>
            <td>{created_at.substr(0, 10)}</td>
        </tr>
    )
}

export default Tr;