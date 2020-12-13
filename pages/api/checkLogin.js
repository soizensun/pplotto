import axios from 'axios';

const resp = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    const HEADERS = { "Content-Type": "application/json" }

    axios.post('http://139.59.112.128:5000/login', data, { headers: HEADERS })
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })
}

export default resp;

