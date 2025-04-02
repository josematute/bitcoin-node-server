import axios from "axios";
import { BlockchainInfo, NetworkInfoResponse, MempoolInfo, BitcoinAllInfo, NetworkInfo } from "./models/btc-models";

const rpcUrl = process.env.BITCOIN_RPC_URL!;
const rpcUser = process.env.BITCOIN_RPC_USER!;
const rpcPass = process.env.BITCOIN_RPC_PASS!;

let rpcId = 0;

export class BitcoinService {
  private async callRpc(method: string, params: any[] = []) {
    console.log(`[BitcoinService] Calling RPC method: ${method} with params:`, params);
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
      console.error(`[BitcoinService] RPC error for method ${method}:`, response.data.error);
      throw new Error(response.data.error.message);
    }

    console.log(`[BitcoinService] Successfully called RPC method: ${method}`);
    return response.data.result;
  }

  public async getBlockchainInfo(): Promise<BlockchainInfo> {
    console.log("[BitcoinService] Getting blockchain info...");
    const result = await this.callRpc("getblockchaininfo");
    console.log("[BitcoinService] Blockchain info retrieved:", {
      chain: result.chain,
      blocks: result.blocks,
      bestblockhash: result.bestblockhash,
      difficulty: result.difficulty,
      size_on_disk: result.size_on_disk,
    });
    return result;
  }

  public async getNetworkInfo(): Promise<NetworkInfoResponse> {
    console.log("[BitcoinService] Getting network info...");
    const result = await this.callRpc("getnetworkinfo");
    console.log("[BitcoinService] Network info retrieved:", {
      version: result.version,
      connections: result.connections,
      connections_in: result.connections_in,
      connections_out: result.connections_out,
      networks: result.networks.map((n: NetworkInfo) => n.name),
    });
    return result;
  }

  public async getMempoolInfo(): Promise<MempoolInfo> {
    console.log("[BitcoinService] Getting mempool info...");
    const result = await this.callRpc("getmempoolinfo");
    console.log("[BitcoinService] Mempool info retrieved:", {
      size: result.size,
      bytes: result.bytes,
      total_fee: result.total_fee,
      maxmempool: result.maxmempool,
    });
    return result;
  }

  public async getAllInfo(): Promise<BitcoinAllInfo> {
    console.log("[BitcoinService] Getting all Bitcoin info...");
    const [blockchainInfo, networkInfo, mempoolInfo] = await Promise.all([
      this.getBlockchainInfo(),
      this.getNetworkInfo(),
      this.getMempoolInfo(),
    ]);

    const result = {
      blockchain: blockchainInfo,
      network: networkInfo,
      mempool: mempoolInfo,
    };

    console.log("[BitcoinService] Successfully retrieved all Bitcoin info");
    return result;
  }
}
