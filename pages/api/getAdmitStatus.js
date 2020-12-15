import axios from 'axios';

const resp = async (req, res) => {

    axios.get('http://139.59.112.128:5000/input-status' )
        .then(r => res.status(200).send(r.data))
        .catch((err) => {
            console.log(err);
        })

}

export default resp;

