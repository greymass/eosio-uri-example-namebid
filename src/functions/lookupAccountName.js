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

    if (namebid.newname === biddingName) {
      return onSuccess(biddingName, true, namebid.high_bid);
    } else {
      rpc.get_account(biddingName).then(() => {
        return onSuccess(biddingName, false, null);
      }).catch(() => {
        return onSuccess(biddingName, true, 0);
      });
    }
  }).catch((err) => console.log({err}));
}
