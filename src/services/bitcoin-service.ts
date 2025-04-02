import axios from "axios";
import { BlockchainInfo, NetworkInfoResponse, MempoolInfo, BitcoinSummaryInfo, NetworkInfo, Block, PaginatedBlocksResponse, BlockQueryParams } from "./models/btc-models";
import { BadRequestError } from "../errors";

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

  public async getAllInfo(): Promise<BitcoinSummaryInfo> {
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

  public async getBlockByHash(hash: string): Promise<Block> {
    console.log(`[BitcoinService] Getting block by hash: ${hash}`);
    const result = await this.callRpc("getblock", [hash]);
    console.log(`[BitcoinService] Block retrieved:`, {
      hash: result.hash,
      height: result.height,
      nTx: result.nTx,
      time: result.time,
    });
    return result;
  }

  public async getBlockHash(height: number): Promise<string> {
    console.log(`[BitcoinService] Getting block hash for height: ${height}`);
    const result = await this.callRpc("getblockhash", [height]);
    console.log(`[BitcoinService] Block hash retrieved: ${result}`);
    return result;
  }

  public async getBlocks(params: BlockQueryParams = {}): Promise<PaginatedBlocksResponse> {
    const pageSize = params.pageSize || 10;
    const currentPage = params.page || 1;
    const startHeight = params.startHeight;

    // Validate page size
    if (pageSize > 20) {
      console.error(`[BitcoinService] Page size ${pageSize} exceeds maximum limit of 20`);
      throw new BadRequestError("Maximum page size is 20 blocks per request");
    }

    console.log(`[BitcoinService] Getting blocks with params:`, { pageSize, currentPage, startHeight });

    // If no start height provided, get the latest block height
    let currentHeight = startHeight;
    if (!currentHeight) {
      const blockchainInfo = await this.getBlockchainInfo();
      currentHeight = blockchainInfo.blocks;
    }

    // Calculate the height range for this page
    const pageStartHeight = currentHeight - (currentPage - 1) * pageSize;
    const pageEndHeight = Math.max(0, pageStartHeight - pageSize + 1);

    console.log(`[BitcoinService] Fetching blocks from height ${pageStartHeight} to ${pageEndHeight}`);

    // Get all block hashes for this page
    const blockHashes = await Promise.all(
      Array.from({ length: pageStartHeight - pageEndHeight + 1 }, (_, i) =>
        this.getBlockHash(pageStartHeight - i)
      )
    );

    // Get full block information for each hash
    const blocks = await Promise.all(
      blockHashes.map(hash => this.getBlockByHash(hash))
    );

    const totalPages = Math.ceil(currentHeight / pageSize);
    const hasNextPage = pageEndHeight > 0;

    const response: PaginatedBlocksResponse = {
      blocks,
      currentPage,
      totalPages,
      hasNextPage,
      nextPageHeight: hasNextPage ? pageEndHeight - 1 : undefined,
      pageSize,
    };

    console.log(`[BitcoinService] Retrieved ${blocks.length} blocks, page ${currentPage} of ${totalPages}`);
    return response;
  }
}
