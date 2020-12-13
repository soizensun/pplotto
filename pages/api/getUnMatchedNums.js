import axios from 'axios';

const resp = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let headers = { "Authorization": data.username }

    axios.get('http://139.59.112.128:5000/unmatched', { headers: headers })
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })
}

export default resp;