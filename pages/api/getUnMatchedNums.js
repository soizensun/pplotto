import axios from 'axios';

const resp = async (req, res) => {
    axios.get('http://localhost:9001/matchedNums')
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })
}

export default resp;