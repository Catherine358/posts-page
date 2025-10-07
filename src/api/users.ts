import {REST_URL} from "../constants/constants.ts";

export const fetchUsers = async () =>
    fetch(`${REST_URL}/users`)
        .then((res) => res.json());