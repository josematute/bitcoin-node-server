import axios from "axios";

const rpcUrl = process.env.BITCOIN_RPC_URL!;
const rpcUser = process.env.BITCOIN_RPC_USER!;
const rpcPass = process.env.BITCOIN_RPC_PASS!;

let rpcId = 0;

export class BitcoinService {
  private async callRpc(method: string, params: any[] = []) {
    const response = await axios.post(
      rpcUrl,
      {
        jsonrpc: "1.0",
        id: rpcId++,
        method,
        params,
      },
      {
        auth: {
          username: rpcUser,
          password: rpcPass,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  }

  public async getBlockchainInfo() {
    return this.callRpc("getblockchaininfo");
  }
}
