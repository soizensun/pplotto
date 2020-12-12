import axios from 'axios';

const resp = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let headers = { "Content-Type": "application/json" }
    headers.Authorization = data.username

    delete data.username

    console.log(data);
    console.log(headers);

    // axios.post('http://192.168.1.42:5000/send-num', data, { headers: HEADERS })
    //     .then(r => res.status(200).send(r.data))
    //     .catch((err) => {
    //         console.log(err);
    //     })
}

export default resp;

