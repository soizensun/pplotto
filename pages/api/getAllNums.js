import axios from 'axios';

const resp = async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));

    let headers = { "Authorization": data.username }

    axios.get('http://localhost:9001/matchedNums', { headers: headers } )
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })

}

export default resp;

