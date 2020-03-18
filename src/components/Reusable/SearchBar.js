import React, { useState } from "react";

import {
    makeStyles,
    TextField,
    Modal,
    Backdrop,
    Fade,
    ListItemText,
    Typography,
} from "@material-ui/core";

export const Search = (search, name) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const fn = (id) => {
        let test = hackathon.admins.find(user => {
            return id === user.user_id
        })
        if (test) {
            return test.user_hackathon_role
        }
    }

    const results = !searchTerm.length
        ? search : search ?
            search.filter(() => {
                return name.toLowerCase().includes(searchTerm.toLowerCase());
            }) : false

    return (
        <div>
            <TextField
                name="search"
                fullWidth
                // className={classes.searchBar}
                type="text"
                placeholder="Search something"
                variant="outlined"
                onChange={handleChange}
                value={searchTerm}
            ></TextField>
            <div>
                {results.map((hacker, index) => {
                    return (
                        <div key={index} > // onClick

                            <div>
                                <i class="material-icons">
                                    person_outline
                    </i>
                                <ListItemText primary={hacker.username} secondary={fn(hacker.id)}
                                    secondaryTypographyProps={{
                                        color: 'primary'
                                    }}>
                                </ListItemText>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}