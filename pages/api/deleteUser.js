import axios from 'axios';

const resp = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let headers = { "Content-Type": "application/json" }
    headers.Authorization = data.username

    delete data.username

    console.log(data);
    console.log(headers);

    axios.post('http://139.59.112.128:5000/delete-num', data, { headers: headers })
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })
}

export default resp;

