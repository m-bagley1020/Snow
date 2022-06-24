import GenericTransactionalWallet from '../GenericTransactionalWallet';
import { AvailableCoins, AvailableCurrencies } from "@snow/common/src";
import { IFromNew } from "../../types";
import { PrivateKey } from 'bitcore-lib-ltc';

export default class TransactionalLitecoin extends GenericTransactionalWallet {
    public currency: AvailableCurrencies = "ltc";
    public coinName: AvailableCoins = "Litecoin";

    async fromNew(obj: IFromNew) {
        // LIKE: https://github.com/dashevo/dashcore-lib/blob/master/docs/usage/privatekey.md
        const newKeypair = new PrivateKey();
        const privateKey = newKeypair.toString();

        // LIKE: https://github.com/dashevo/dashcore-lib/blob/master/docs/usage/publickey.md
        const publicKey = newKeypair.toPublicKey().toAddress().toString();
        return await this._initInDatabase({
            ...obj,
            publicKey,
            privateKey
        });
    }
}