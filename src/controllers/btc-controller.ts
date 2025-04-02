import { Controller, Get, Route, Tags, Security, OperationId, Path, Query } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { BitcoinService } from "../services/bitcoin-service";
import { BitcoinSummaryInfo, Block, PaginatedBlocksResponse } from "../services/models/btc-models";

@Route("/api/v1/btc")
@Tags("Bitcoin")
export class BitcoinController extends Controller {
  @Get("info")
  @Security("jwt")
  @OperationId("getBlockchainInfo")
  public async getBlockchainInfo(): Promise<BitcoinSummaryInfo> {
    console.log("[BitcoinController] Getting Bitcoin info...");
    const service = new BitcoinService();
    const info = await service.getAllInfo();
    console.log("[BitcoinController] Successfully retrieved Bitcoin info:", {
      blockchain: {
        chain: info.blockchain.chain,
        blocks: info.blockchain.blocks,
      },
      network: {
        connections: info.network.connections,
        version: info.network.version,
      },
      mempool: {
        size: info.mempool.size,
        total_fee: info.mempool.total_fee,
      },
    });
    this.setStatus(StatusCodes.OK);
    return info;
  }

  @Get("block/{hash}")
  @Security("jwt")
  @OperationId("getBlockByHash")
  public async getBlockByHash(@Path() hash: string): Promise<Block> {
    console.log(`[BitcoinController] Getting block by hash: ${hash}`);
    const service = new BitcoinService();
    const block = await service.getBlockByHash(hash);
    console.log(`[BitcoinController] Successfully retrieved block:`, {
      hash: block.hash,
      height: block.height,
      nTx: block.nTx,
      time: block.time,
    });
    this.setStatus(StatusCodes.OK);
    return block;
  }

  @Get("blocks")
  @Security("jwt")
  @OperationId("getBlocks")
  public async getBlocks(
    @Query() page?: number,
    @Query() pageSize?: number,
    @Query() startHeight?: number
  ): Promise<PaginatedBlocksResponse> {
    console.log("[BitcoinController] Getting blocks with params:", { page, pageSize, startHeight });
    const service = new BitcoinService();
    const blocks = await service.getBlocks({ page, pageSize, startHeight });
    console.log("[BitcoinController] Successfully retrieved blocks:", {
      count: blocks.blocks.length,
      currentPage: blocks.currentPage,
      totalPages: blocks.totalPages,
      hasNextPage: blocks.hasNextPage,
    });
    this.setStatus(StatusCodes.OK);
    return blocks;
  }
}
