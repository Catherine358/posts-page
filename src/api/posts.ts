import {REST_URL} from "../constants/constants.ts";

export const fetchPosts = async () =>
    fetch(`${REST_URL}/posts`)
    .then((res) => res.json());