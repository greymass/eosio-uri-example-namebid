const fetch = require('node-fetch');
const textEncoding = require('text-encoding');
const { JsonRpc } = require('eosjs');

const rpc = new JsonRpc('https://eos.greymass.com', { fetch });

export default function lookupAccountName(biddingName, onSuccess) {
  const query = {
    code: 'eosio',
    json: true,
    limit: 1,
    lower_bound: biddingName,
    scope: 'eosio',
    table: 'namebids'
  };
  rpc.get_table_rows(query).then((results) => {
    const { rows } = results;
    const namebid = rows[0];
    console.log({namebid})

    onSuccess(biddingName, namebid.newname === biddingName, namebid.high_bid)
  }).catch((err) => console.log({err}));
}
