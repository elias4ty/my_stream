import axios from 'axios';

export default function send({ id, data, len, chunkid}){
  const pro = new Promise((rv) => {
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/upload');

    // xhr.onload = function load(ev) {
    //   const resp = JSON.parse(ev.target.response);

    //   rv(resp);
    // };

    // xhr.onerror = function error(e) {
    //   console.error(e);

    //   rv({
    //     err: true,
    //     chunkid
    //   });

    //   send({ id, data, len, chunkid})
    // };

    const body = new FormData();
    body.append('id', id);
    body.append('chunkid', chunkid);
    body.append('data', data);
    body.append('len', len);

    // xhr.send('id=3&name=uu');

    axios.post('/upload',
      body
    ).then((resp) => {
      rv(resp);
    }, err => {
      console.error(err)
    })
  });

  return pro;
};