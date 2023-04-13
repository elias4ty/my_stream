import send from './index';

const conCount = 6;

export default function httpPro(files, fileId) {
  const sum = files.length;
  const chain = [];
  let cur = 0;

  loopChain();

  function loopChain() {
    while(chain.length < conCount && cur < sum) {
      chain.push(files[cur].chunkid);
      console.log('chain => ', chain);

      send({
        id: fileId,
        chunkid: cur,
        data: files[cur],
        len: sum
      }).then(res => {
        if(res.err === undefined) {
          for(let c = 0; c < chain.length; c++) {
            if(chain[c] === res.chunkid) {
              chain.splice(c, 1);
              console.log(`${cur} 已经完成`);
              break;
            }        
          }

          loopChain();
        }
      });

      cur++;
    }

    if(cur === sum - 1 && chain.length === 0) {
      console.log('done');
    }
  }
}